import Callback from "@/Models/Callback";
import Contact from "@/Models/Contact";
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
      const contact = new Contact({
        name,
        email,
        phone,
        message,
      });

      await contact.save();
      res.status(201).json({ success: true, contact });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  }
}
