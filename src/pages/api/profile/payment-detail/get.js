import DbConnect from "@/Config/dbConfig";
import { mainAuth } from "@/middleware/isMainAuth";
import PayDetails from "@/models/PayDetails";

const handler = async (req, res) => {
  const { user } = req.auth;
  if (req.method === "POST") {
    try {
      await DbConnect();

      const paymentDetails = await PayDetails.find({ user: user._id }).sort({
        updatedAt: -1,
      });

      res.status(201).json({ success: true, paymentDetails });
    } catch (error) {
      console.log(error);
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
