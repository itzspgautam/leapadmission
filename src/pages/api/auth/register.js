import DbConnect from "@/Config/dbConfig";
import User from "@/Models/User";

const register = async (req, res) => {
  if (req.method === "POST") {
    await DbConnect();

    try {
      // Check if the user already exists in the database
      const existingUser = await User.findOne({ uid: req.body.uid });
      if (existingUser) {
        return res.status(200).json({ user: existingUser });
      }

      console.log(req.body);
      // Create a new user
      const user = new User(req.body);

      console.log("to register", user);

      // Save the user to the database
      const savedUser = await user.save();
      return res.status(201).json({ user: savedUser });
    } catch (error) {
      return res.status(500).json({
        message: "Error creating user:",
        error,
      });
    }
  }
};
export default register;
