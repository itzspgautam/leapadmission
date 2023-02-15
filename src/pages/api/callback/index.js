import Callback from "@/Models/Callback";
import Preps from "@/Models/Preps";
const DbConnect = require("../../../Config/dbConfig");

export default async function handler(req, res) {
  if (req.method === "POST") {
    await DbConnect();
    const { name, email, phone, message } = req.body;
    if (!name || !email || !phone) {
      res
        .status(400)
        .json({ success: false, error: "All field are required." });
      return;
    }
    try {
      const callback = new Callback({
        name,
        email,
        phone,
        message,
      });

      await callback.save();
      res.status(201).json({ success: true, callback });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  }
  if (req.method === "GET") {
    await DbConnect();
    try {
      const callbacks = await Callback.find();

      res.status(200).json({ success: true, callbacks });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  }
}
