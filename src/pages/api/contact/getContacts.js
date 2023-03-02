// get all sites of a user
import DbConnect from "@/Config/dbConfig";
import Contact from "@/Models/Contact";
import { withAuth } from "../auth/adminAuth";

const handler = async (req, res) => {
  if (req.method === "POST") {
    await DbConnect();
    try {
      const contacts = await Contact.find();
      return res.status(200).json({ sucess: true, contacts });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  }
};

export default withAuth(handler);
