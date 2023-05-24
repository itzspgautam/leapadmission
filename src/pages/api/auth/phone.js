import DbConnect from "@/Config/dbConfig";
import User from "@/models/User";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { phone } = req.body;
    if (!phone || phone.length < 10) {
      return res.status(400).json({
        success: false,
        error: "Enter valid phone number.",
      });
    }
    await DbConnect();

    try {
      const isPhoneRegistered = await User.findOne({ phone });
      console.log("already reg", isPhoneRegistered);
      if (isPhoneRegistered) {
        return res.status(400).json({
          success: false,
          error: "This phone number is associated with another account",
        });
      }
      return res.status(201).json({ success: true });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  } else {
    return res
      .status(400)
      .json({ success: false, error: "Invalid Request. Unauthorised" });
  }
};

export default handler;
