import RazorpayConfig from "@/Config/razorpay";
import { mainAuth } from "@/middleware/isMainAuth";
import Investment from "@/models/Investment";
import { CreateOrder } from "@/utils/Razorpay/Order";

const handler = async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const { invest, month } = req.body;

        if (!invest || !month) {
          return res
            .status(400)
            .json({ success: false, message: "All fields are required." });
        }

        let isValidInvest = await Investment.findById(invest);
        console.log(isValidInvest);
        if (!isValidInvest) {
          throw new Error("Investment not found.");
        }

        console.log(isValidInvest.investor, req.auth.user._id);

        if (!isValidInvest.investor.equals(req.auth.user._id)) {
          throw new Error("You are not authorized to access this resource");
        }

        if (isValidInvest.transactions.length > 0) {
          isValidInvest = await Investment.findById(invest).populate(
            "transactions"
          );

          let isAlreadyPaidForThisMonth = isValidInvest.transactions.filter(
            (tr) => {
              return tr.month === month && tr.status === "success";
            }
          );

          if (isAlreadyPaidForThisMonth.length > 0) {
            throw new Error("You have already paid for this month.");
          }
        }

        let amount = 0;

        if (isValidInvest.paymentType === "full") {
          amount = Math.ceil(isValidInvest.amount);
        }

        if (isValidInvest.paymentType === "emi") {
          amount = Math.ceil(isValidInvest.amount / isValidInvest.emiDuration);
        }
        console.log("amount", amount);
        var options = {
          amount: amount * 100, // amount in the smallest currency unit
          receipt: "RC-" + isValidInvest?._id + "-" + month,
          notes: {
            tc_order_id: "TC-" + isValidInvest?._id + "-" + month,
            invest: isValidInvest?._id,
            month,
            customer_name: req.auth.user.name,
            customer_email: req.auth.user.email,
            customer_contact: req.auth.user.phone,
            description: `Payment for the ${month} month of  investment id ${invest} in The Capitals.`,
          },
        };

        const order = await CreateOrder(options);

        //console.log(order);
        return res.status(201).json({
          success: true,
          order,
        });
      } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, error: error.message });
      }

    default:
      return res.status(400).json({ success: false });
  }
};

export default mainAuth(handler);
