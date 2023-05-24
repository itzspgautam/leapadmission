import DbConnect from "@/Config/dbConfig";
import { mainAuth } from "@/middleware/isMainAuth";
import Refer from "@/models/Refer";
import User from "@/models/User";

const handler = async (req, res) => {
  const { user } = req.auth;
  if (req.method === "POST") {
    try {
      await DbConnect();
      const { referId, amount } = req.body;

      if (!referId || !amount) {
        throw new Error("All fileds are required.");
      }

      const isReferalIdvalid = await User.findById(referId);
      if (!isReferalIdvalid) {
        throw new Error("Invalid Referal User.");
      }

      const isAlreadyRefered = await Refer.findOne({ user: user._id, referId });
      if (isAlreadyRefered) {
        res.status(200).json({ success: true, referal: isAlreadyRefered });
        return;
      }

      const newReferal = new Refer({
        user: user._id,
        referId,
        amount,
      });

      await newReferal.save();
      return res.status(201).json({ success: true, referal: newReferal });
    } catch (error) {
      console.log("error");
      res.status(500).json({
        sussess: false,
        error: error.message,
      });
    }
  } else {
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  if (req.method === "PUT") {
    try {
      await DbConnect();
      const { referId, status } = req.body;

      if (!referId || !amount) {
        throw new Error("All fileds are required.");
      }

      const isReferalIdvalid = await User.findById(referId);
      if (!isReferalIdvalid) {
        throw new Error("Invalid Referal User.");
      }

      const newReferal = new Refer({
        user: user._id,
        referId,
        amount,
      });

      const referal = await newReferal.save();

      res.status(201).json({ success: true, referal });
    } catch (error) {
      res.status(500).json({
        sussess: false,
        error: error.message,
      });
    }
  } else {
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

export default mainAuth(handler);
