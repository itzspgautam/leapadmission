import DbConnect from "@/Config/dbConfig";
import { mainAuth } from "@/middleware/isMainAuth";
import DeviceToken from "@/models/DeviceToken";
import { sendNotification } from "@/utils/Notification/index.js";

const handler = async (req, res) => {
  const { user } = req.auth;
  if (req.method === "POST") {
    try {
      await DbConnect();
      const { receiverId, title, body, save } = req.body;

      const send = await sendNotification({
        receiverId,
        title,
        body,
        save,
      });
      return res.status(201).json({ success: true, status: send });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  } else {
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

export default mainAuth(handler);
