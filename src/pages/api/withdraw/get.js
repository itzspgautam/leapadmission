import DbConnect from "@/Config/dbConfig";
import { mainAuth } from "@/middleware/isMainAuth";
import Config from "@/models/Config";
import Investment from "@/models/Investment";
import { emiStatus } from "@/utils/Emi";
import { getprofitIntrest } from "@/utils/Intrest";
import Transaction from "@/models/Transaction";
import Withdraw from "@/models/Withdraw";

const handler = async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        await DbConnect();
        const config = await Config.find();

        const investment = await Investment.findById(req.body.invest)
          .populate("transactions")
          .populate("withdraw");

        if (!investment) {
          throw new Error("Investment not found.");
        }
        if (!investment.investor.equals(req.auth.user._id)) {
          throw new Error("You are not authorised to access this resource.");
        }

        if (investment?.withdraw?.status === "success") {
          return res.status(200).json({
            success: false,
            error: "WITHDRAWN_ALREADY",
            message:
              "It appears that a withdrawal was already settled on " +
              investment?.withdraw?.updatedAt.toLocaleDateString("en-IN", {
                year: "numeric",
                month: "short",
                day: "numeric",
              }),
            date: investment?.withdraw?.updatedAt,
          });
        }

        let emi = await emiStatus(investment);

        const paidEmi = emi.filter((pay) => pay.status === "success");
        const unPaidEMi = emi.filter((pay) => pay.status === "pending");

        //Paymnet incomplete - decline withdrawal
        if (unPaidEMi.length > 0) {
          return res.status(200).json({
            success: false,
            error: "INCOMPLETE_PAYMENT",
            message:
              "Kindly ensure that any outstanding payment due is settled before initiating any withdrawals.",
            date: "",
          });
        }
        const currentDate = new Date(Date.now());
        const lastPaymentDate = paidEmi[paidEmi.length - 1].createdAt;

        const vestingDate = new Date(
          lastPaymentDate.getTime() +
            30 * config[0].invest.MinWithdrawMonth * 24 * 60 * 60 * 1000
        );

        //Withdraw before vesting (Min withdrawal duration) date - decline withdrawal
        if (currentDate < vestingDate) {
          return res.status(200).json({
            success: false,
            error: "INCOMPLETE_VESTING_DATE",
            message:
              "Withdrawals are permitted " +
              config[0].invest.MinWithdrawMonth +
              " months after the date of your last payment. As such, you will be able to withdraw your funds after " +
              vestingDate.toLocaleDateString("en-IN", {
                year: "numeric",
                month: "short",
                day: "numeric",
              }),
            date: vestingDate,
          });
        }

        //Calculate Last date of investment
        const fullEmiDurationDate = new Date(
          investment.createdAt.getTime() +
            30 * investment.duration * 24 * 60 * 60 * 1000
        );

        //Withdrwal before Last investment date - Decrese he intrest % to PreDurationWithdrawIntrest
        let intrest = investment.intrest;
        let warning = null;
        if (currentDate < fullEmiDurationDate) {
          intrest = config[0].invest.PreDurationWithdrawIntrest;
          warning =
            "Please note that the current interest rate is " +
            investment.intrest +
            "%. However, if you withdraw before the investment duration period (" +
            fullEmiDurationDate.toLocaleDateString("en-IN", {
              year: "numeric",
              month: "short",
              day: "numeric",
            }) +
            "), you will be eligible to receive a reduced interest rate of " +
            config[0].invest.PreDurationWithdrawIntrest +
            "%";
        }

        const info = await getprofitIntrest({ ...investment._doc, intrest });

        //Total withdrawal ammount
        let withdrawAmount = Math.ceil(info.totalPaid + info.totalIntrest);

        return res.status(200).json({
          success: true,
          warning,
          withdrawAmount,
          amount: info.totalPaid,
          profit: info.totalIntrest,
          intrest,
          duration: investment.duration,
        });

        console.log(
          lastPaymentDate,
          vestingDate,
          fullEmiDurationDate,
          intrest,
          info
        );
        return;

        // investment.push({ ...investment._doc, profit, emi }); //  add the investment and emi to an array

        return res.status(201).json({ success: true, ValidUpto });
      } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
      }

    default:
      return res.status(400).json({ success: false });
  }
};

export default mainAuth(handler);
