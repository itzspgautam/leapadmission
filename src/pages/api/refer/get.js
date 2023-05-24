import DbConnect from "@/Config/dbConfig";
import { mainAuth } from "@/middleware/isMainAuth";
import Refer from "@/models/Refer";
import User from "@/models/User";

const handler = async (req, res) => {
  const { user } = req.auth;
  if (req.method === "POST") {
    try {
      await DbConnect();
      console.log(user._id);
      const myReferals = await Refer.find({ referId: user._id }).populate(
        "user"
      );

      return res.status(200).json({ success: true, myReferals });
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
