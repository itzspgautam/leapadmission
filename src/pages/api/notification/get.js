import DbConnect from "@/Config/dbConfig";
import { mainAuth } from "@/middleware/isMainAuth";
import Notification from "@/models/Notification";

const handler = async (req, res) => {
  const { user } = req.auth;
  if (req.method === "POST") {
    try {
      await DbConnect();

      const Notifications = await Notification.find({ user: user._id }).sort({
        updatedAt: -1,
      });

      res.status(201).json({ success: true, Notifications });
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
