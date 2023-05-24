import DbConnect from "@/Config/dbConfig";
import { mainAuth } from "@/middleware/isMainAuth";
import ReferWithdraw from "@/models/ReferWithdraw";

const handler = async (req, res) => {
  const { user } = req.auth;
  if (req.method === "POST") {
    try {
      await DbConnect();
      const myReferalsWithdraw = await ReferWithdraw.find({ user: user._id });

      return res
        .status(200)
        .json({ success: true, withdrawals: myReferalsWithdraw });
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
};

export default mainAuth(handler);
