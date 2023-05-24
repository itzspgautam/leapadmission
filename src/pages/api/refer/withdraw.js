import DbConnect from "@/Config/dbConfig";
import { mainAuth } from "@/middleware/isMainAuth";
import PayDetails from "@/models/PayDetails";
import Refer from "@/models/Refer";
import ReferWithdraw from "@/models/ReferWithdraw";
import User from "@/models/User";

const handler = async (req, res) => {
  const { user } = req.auth;
  if (req.method === "POST") {
    try {
      await DbConnect();

      const { payDetail } = req.body;

      //   const paymentDetail = await PayDetails.findOne({
      //     _id: payDetail,
      //     user: user._id,
      //   });
      //   if (!paymentDetail) {
      //     throw new Error("Payment details not found");
      //   }

      const myReferals = await Refer.find({
        referId: user._id,
        status: "rewarded",
      });
      if (myReferals.length === 0) {
        throw new Error("Referals not found!");
      }

      let amount = 0;
      myReferals.forEach(async (ref) => {
        amount += ref.amount;
        ref.status = "withdraw requested";
        await ref.save();
      });

      const newRefWithdraw = new ReferWithdraw({
        user: user._id,
        amount,
        paymentDetail: payDetail,
      });

      await newRefWithdraw.save();
      return res
        .status(201)
        .json({ success: true, refWithdraw: newRefWithdraw });
    } catch (error) {
      return res.status(500).json({
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
