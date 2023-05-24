import DbConnect from "@/Config/dbConfig";
import { mainAuth } from "@/middleware/isMainAuth";
import DeviceToken from "@/models/DeviceToken";

const handler = async (req, res) => {
  const { user } = req.auth;
  if (req.method === "POST") {
    try {
      await DbConnect();
      const { deviceToken } = req.body;

      if (!deviceToken) {
        throw new Error("Invalid device token.");
      }

      const isLAreadySaved = await DeviceToken.findOne({ deviceToken });
      if (isLAreadySaved) {
        return res
          .status(200)
          .json({ success: true, created: false, deviceToken: isLAreadySaved });
      }

      const newDeviceToken = new DeviceToken({
        user: user._id,
        deviceToken,
      });
      const savedDeviceToken = await newDeviceToken.save();
      return res
        .status(201)
        .json({ success: true, created: true, deviceToken: savedDeviceToken });
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
