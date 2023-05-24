import DbConnect from "@/Config/dbConfig";
import { firebaseAuth } from "@/middleware/isFirebaseAuth";
import User from "@/models/User";
import { generateToken } from "@/utils/Token";

const handler = async (req, res) => {
  if (req.method === "POST") {
    await DbConnect();

    try {
      const isUserValid = await User.findOne({
        email: req.user.email,
        phone: req.user.phone_number,
      });
      if (!isUserValid) {
        return res
          .status(400)
          .json({ success: false, error: "Invalid request. Unauthorised!" });
      }

      const token = await generateToken({ _id: isUserValid._id });
      console.log(token);
      return res.status(201).json({ success: true, user: isUserValid, token });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  } else {
    return res
      .status(400)
      .json({ success: false, error: "Invalid Request. Unauthorised" });
  }
};

export default firebaseAuth(handler);
