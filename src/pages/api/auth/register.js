import User from "@/Models/User";

export default async function (req, res) {
  if (req.method === "POST") {
    try {
      const { providerData, uid } = req.body;

      // Check if the user already exists in the database
      const existingUser = await User.findOne({ uid });
      if (existingUser) {
        return res.json({ user: existingUser });
      }

      // Create a new user
      const user = new User({
        providerData,
        uid,
      });

      // Save the user to the database
      const savedUser = await user.save();
      return res.json({ user: savedUser });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Error creating user" });
    }
  }
}
