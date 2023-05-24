import DbConnect from "@/Config/dbConfig";
import { mainAuth } from "@/middleware/isMainAuth";
import Config from "@/models/Config";
import Investment from "@/models/Investment";
import Transaction from "@/models/Transaction";
import { emiStatus } from "@/utils/Emi";
import { getprofitIntrest } from "@/utils/Intrest";

const handler = async (req, res) => {
  const { method } = req;
  console.log(req.auth);
  switch (method) {
    case "POST":
      try {
        const { invest } = req.body;

        await DbConnect();

        await Config.deleteMany({});

        const newConfig = new Config({
          invest,
        });

        await newConfig.save();

        return res.status(201).json({
          success: true,
          config: newConfig,
        });
      } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
      }

    default:
      return res.status(400).json({ success: false });
  }
};

export default mainAuth(handler);
