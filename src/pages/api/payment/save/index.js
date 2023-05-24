import DbConnect from "@/Config/dbConfig";
import { mainAuth } from "@/middleware/isMainAuth";
import Investment from "@/models/Investment";
import Refer from "@/models/Refer";
import Transaction from "@/models/Transaction";
import { sendNotification } from "@/utils/Notification/index.js";
import { getOrderById } from "@/utils/Razorpay/Order";
import { getPaymentById } from "@/utils/Razorpay/Payment";
import { verifyRzpPayment } from "@/utils/VerifyRzpPayment";

const handler = async (req, res) => {
  const { method } = req;
  const { user } = req.auth;
  switch (method) {
    case "POST":
      try {
        const { invest, status, paymentId, paymentRef } = req.body;

        if (!invest) {
          throw new Error("Investment not found. Bad request!");
        }
        if (!paymentId) {
          throw new Error("Payment not found. Bad request!");
        }
        if (!paymentRef) {
          throw new Error("Refrence is required");
        }
        if (!status) {
          throw new Error("Status is required.");
        }

        await DbConnect();

        const investment = await Investment.findById(invest);
        if (!investment) {
          throw new Error("Investment not found. Bad request!");
        }

        const payment = await getPaymentById(paymentId);
        const order = await getOrderById(paymentRef);

        if (!payment || !order) {
          throw new Error("Invalid Payment!");
        }

        if (payment.order_id !== order.id) {
          throw new Error("Invalid Payment!");
        }

        const isPaymentsAlreadyCreated = await Transaction.find({
          $or: [{ paymentRef }, { paymentId }],
        });
        if (isPaymentsAlreadyCreated.length > 0) {
          throw new Error("Invalid Payment");
        }

        const transaction = new Transaction({
          invest,
          amount: payment.amount / 100,
          month: payment.notes.month,
          status,
          paymentId: payment.id,
          paymentRef: order.id,
          paymentMode: "Razorpay",
        });

        await transaction.save();
        investment.status = "success";
        investment.transactions.push(transaction._id);
        await investment.save();

        //Handle referal-<if user invested first time then reward referal
        const totalInvest = await Investment.find({ investor: user?._id });
        if (totalInvest.length === 1) {
          const referal = await Refer.findOne({ user: user._id });
          if (referal) {
            referal.status = "rewarded";
            await referal.save();
            //send reward referal
            await sendNotification({
              receiverId: referal.referId,
              title: "Congratulations!",
              body: "You have successfully referred a friend and earned a reward!",
              save: true,
            });
          }

          //congratulate customer
          await sendNotification({
            receiverId: user._id,
            title: "Congratulations on Your Investment!",
            body: "Your investment has been successfully processed. Thank you for investing in our platform and choosing us as your partner in achieving your financial goals.",
            save: true,
          });
        }
        console.log(payment.notes.month);
        if (payment.notes.month === "1") {
          //congratulate customer new investmbt
          await sendNotification({
            receiverId: user._id,
            title: "Congratulations on Your Investment!",
            body: "Your investment has been successfully processed. Thank you for investing in our platform and choosing us as your partner in achieving your financial goals.",
            save: true,
          });
        } else {
          //Emi Paid notification
          await sendNotification({
            receiverId: user._id,
            title: "Paid Successfully!",
            body:
              "Successfully paid for month " +
              payment.notes.month +
              " of investment ID: " +
              invest,
            save: true,
          });
        }

        return res.status(201).json({
          success: true,
          transaction,
          transaction,
          order,
          payment,
        });
      } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
      }

    case "PUT":
      try {
        const { invest, amount, month } = req.body;

        if (!invest) {
          throw new Error("Investment not found. Bad request!");
        }
        if (!amount) {
          throw new Error("Amount is required");
        }

        if (!month) {
          throw new Error("Month is required.");
        }

        await DbConnect();

        const isValidInvest = await Investment.findById(invest).populate(
          "transactions"
        );
        if (!isValidInvest) {
          throw new Error("Investment does't exist. Bad request!");
        }

        let isAlreadyPaidForThisMonth = isValidInvest.transactions.find(
          (tr) => {
            return tr.month === month && tr.status === "success";
          }
        );

        if (isAlreadyPaidForThisMonth) {
          throw new Error("You had already paid for this month.");
        }

        const transaction = new Transaction({
          invest,
          amount,
          month,
        });

        await transaction.save();

        isValidInvest.transactions.push(transaction._id);
        await isValidInvest.save();

        return res.status(201).json({
          success: true,
          transaction,
          isValidInvest,
        });
      } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
      }

    default:
      return res.status(400).json({ success: false });
  }
};

export default mainAuth(handler);
