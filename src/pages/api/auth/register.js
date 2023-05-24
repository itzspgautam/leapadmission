import DbConnect from "@/Config/dbConfig";
import { firebaseAuth } from "@/middleware/isFirebaseAuth";
import User from "@/models/User";
import { generateToken } from "@/utils/Token";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { name, avatar } = req.body;

    // Check if any input is empty
    if (!name) {
      return res
        .status(400)
        .json({ success: false, error: "Please enter full name." });
    }

    await DbConnect();

    const isEmailRegistered = await User.findOne({ email: req.user.email });
    if (isEmailRegistered) {
      return res
        .status(400)
        .json({ success: false, error: "Email is already registered." });
    }

    const isPhoneRegistered = await User.findOne({
      phone: req.user.phone_number,
    });
    if (isPhoneRegistered) {
      return res
        .status(400)
        .json({ success: false, error: "Phone Number is already registered." });
    }

    try {
      const newUser = new User({
        name,
        avatar,
        email: req.user.email,
        phone: req.user.phone_number,
      });

      await newUser.save();
      const token = await generateToken({ _id: newUser._id });
      return res.status(201).json({ success: true, user: newUser, token });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  } else {
    return res.status(400).json({ success: false, error: "Invalid Request" });
  }
};

export default firebaseAuth(handler);
