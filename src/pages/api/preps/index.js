import Preps from "@/Models/Preps";
const DbConnect = require("../../../Config/dbConfig");

export default async function handler(req, res) {
  if (req.method === "POST") {
    await DbConnect();
    const { title, poster, link: watchLink, credit, timestamp } = req.body;
    if (!title || !poster || !watchLink || !credit || !timestamp) {
      res
        .status(400)
        .json({ success: false, error: "All field are required." });
      return;
    }
    try {
      const link = watchLink.replace("watch?v=", "embed/");
      // Create a new Video document with the data from the request body
      const prep = new Preps({
        title,
        poster,
        link,
        credit,
        timestamp,
      });

      await prep.save();
      res.status(201).json({ success: true, prep });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  }
  if (req.method === "GET") {
    await DbConnect();
    try {
      const preps = await Preps.find();

      res.status(200).json({ success: true, preps });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  }
}
