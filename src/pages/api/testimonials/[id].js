// get all sites of a user
import DbConnect from "@/Config/dbConfig";
import Contact from "@/Models/Contact";
import Testimonial from "@/Models/Testimonial";
import { withAuth } from "../auth/adminAuth";

const handler = async (req, res) => {
  console.log(req.query);
  if (req.method === "PUT") {
    await DbConnect();

    if (!req.query.id)
      return res
        .status(500)
        .json({ status: false, message: "Invalid Testimonial" });
    try {
      const isValidTsm = await Testimonial.findById(req.query.id);
      if (!isValidTsm)
        return res
          .status(500)
          .json({ status: false, message: "Invalid Testimonial" });

      const testimonials = await Testimonial.findByIdAndUpdate(isValidTsm._id, {
        status: req.query.status,
      });

      return res.status(200).json({ sucess: true, testimonials });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  }
};

export default withAuth(handler);
