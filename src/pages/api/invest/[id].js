import DbConnect from "@/Config/dbConfig";
import { mainAuth } from "@/middleware/isMainAuth";
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

        let investment = [];

        const investmentRes = await Investment.findById(req.query.id)
          .populate("transactions")
          .populate("withdraw");

        if (!investmentRes) {
          throw new Error("Investment not found.");
        }

        let emi = await emiStatus(investmentRes);
        let info = await getprofitIntrest(investmentRes);

        investment.push({ ...investmentRes._doc, info, emi }); //  add the investment and emi to an array

        return res
          .status(201)
          .json({ success: true, investment: investment[0] });
      } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
      }

    default:
      return res.status(400).json({ success: false });
  }
};

export default mainAuth(handler);
