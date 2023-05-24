import DbConnect from "@/Config/dbConfig";
import { mainAuth } from "@/middleware/isMainAuth";
import Investment from "@/models/Investment";
import Transaction from "@/models/Transaction";
import Withdraw from "@/models/Withdraw";
import { emiStatus } from "@/utils/Emi";
import { getprofitIntrest } from "@/utils/Intrest";

const handler = async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        await DbConnect();

        let investments = [];

        const investmentsres = await Investment.find({
          investor: req.auth.user._id,
          status: "success",
        })
          .populate("transactions")
          .populate("withdraw");

        let total = 0;
        let totalPaid = 0;
        let totalProfit = 0;
        for (const investment of investmentsres) {
          let emi = await emiStatus(investment);
          let info = await getprofitIntrest(investment);
          investments.push({ investment, info, emi }); // for example, add the investment and emi to an array
          total += investment.amount;
          totalPaid += info.totalPaid;
          totalProfit += info.totalIntrest;
        }

        return res.status(201).json({
          success: true,
          investments,
          allinfo: { total, totalPaid, totalProfit },
        });
      } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
      }

    default:
      return res.status(400).json({ success: false });
  }
};

export default mainAuth(handler);
