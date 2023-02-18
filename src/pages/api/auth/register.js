import User from "@/Models/User";

const register = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { providerData } = req.body;

      // Check if the user already exists in the database
      const existingUser = await User.findOne({ uid: providerData.uid });
      if (existingUser) {
        return res.status(200).json({ user: existingUser });
      }

      // Create a new user
      const user = new User(providerData);

      // Save the user to the database
      const savedUser = await user.save();
      return res.status(201).json({ user: savedUser });
    } catch (error) {
      return res.status(500).json({
        message: "Error creating user:",
        error: error?.response?.data?.message,
      });
    }
  }
};
export default register;
