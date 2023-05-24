import DbConnect from "@/Config/dbConfig";
import { mainAuth } from "@/middleware/isMainAuth";
import Config from "@/models/Config";
import Investment from "@/models/Investment";

const handler = async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const { amount, duration, paymentType, emiDuration } = req.body;

        if (!amount || !duration || !emiDuration || !paymentType) {
          throw new Error("All fields are required.");
        }

        await DbConnect();

        const config = await Config.find();

        let intrest = 0;
        let emiDurationFix = emiDuration;

        if (paymentType === "full") {
          intrest = config[0].invest.FullIntrest;
          emiDurationFix = 1;
        }

        if (paymentType === "emi") {
          if (
            emiDuration > config[0].invest.MaxEmiMonth ||
            emiDuration < config[0].invest.MinEmiMonth
          ) {
            throw new Error(
              "Minimun and maximum emi duration is 2 and 4 month respectively."
            );
          }
          intrest = config[0].invest.EmiIntrest;
        }

        const NewInvestment = new Investment({
          investor: req.auth.user._id,
          amount,
          duration,
          paymentType,
          intrest,
          emiDuration: emiDurationFix,
        });

        console.log("NEW", NewInvestment);

        await NewInvestment.save();

        return res.status(201).json({
          success: true,
          investment: NewInvestment,
        });
      } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
      }

    case "PUT":
      try {
        const { invest, amount, duration, paymentType, emiDuration } = req.body;

        if (!invest || !amount || !duration || !emiDuration || !paymentType) {
          throw new Error("All fields are required.");
        }

        await DbConnect();

        const isValidInvest = await Investment.findById(invest);
        console.log(isValidInvest);
        if (!isValidInvest) {
          throw new Error("Investment not found.");
        }

        if (!isValidInvest.investor.equals(req.auth.user._id)) {
          throw new Error("You are not authorised to access this resource.");
        }

        const config = await Config.find();

        let intrest = 0;
        let emiDurationFix = emiDuration;

        if (paymentType === "full") {
          intrest = config[0].invest.FullIntrest;
          emiDurationFix = 1;
        }

        if (paymentType === "emi") {
          if (
            emiDuration > config[0].invest.MaxEmiMonth ||
            emiDuration < config[0].invest.MinEmiMonth
          ) {
            throw new Error(
              "Minimun and maximum emi duration is 2 and 4 month respectively."
            );
          }
          intrest = config[0].invest.EmiIntrest;
        }

        const updatedData = {
          amount,
          duration,
          paymentType,
          intrest,
          emiDuration: emiDurationFix,
        };

        const updatedInvestment = await Investment.findByIdAndUpdate(
          invest,
          updatedData,
          { new: true }
        );

        return res.status(201).json({
          success: true,
          investment: updatedInvestment,
        });
      } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
      }

    default:
      return res.status(400).json({ success: false });
  }
};

export default mainAuth(handler);
