// get all sites of a user
import DbConnect from "@/Config/dbConfig";
import Contact from "@/Models/Contact";
import { withAuth } from "../auth/adminAuth";

const handler = async (req, res) => {
  console.log(req.query);
  if (req.method === "PUT") {
    await DbConnect();
    if (!req.query.id)
      return res
        .status(500)
        .json({ status: false, message: "Invalid Contact" });
    try {
      const isValidContact = await Contact.findById(req.query.id);
      if (!isValidContact)
        return res
          .status(500)
          .json({ status: false, message: "Invalid Contact" });

      const contact = await Contact.findByIdAndUpdate(isValidContact._id, {
        status: req.query.status,
      });

      return res.status(200).json({ sucess: true, contact });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  }
};

export default withAuth(handler);
