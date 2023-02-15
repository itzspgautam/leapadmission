import Preps from "@/Models/Preps";
const DbConnect = require("../../../Config/dbConfig");

export default async function handler(req, res) {
  if (req.method === "GET") {
    await DbConnect();
    try {
      const prep = await Preps.findById(req.query.id);

      res.status(200).json({ success: true, prep });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  }
}
