// get all sites of a user
import DbConnect from "@/Config/dbConfig";
import Callback from "@/Models/Callback";
import User from "@/Models/User";
import { withAuth } from "../auth/adminAuth";

const handler = async (req, res) => {
  await DbConnect();
  console.log(req.query);
  if (req.method === "PUT") {
    if (!req.query.id)
      return res
        .status(500)
        .json({ status: false, message: "Invalid Callback" });
    try {
      const isValidcallback = await Callback.findById(req.query.id);
      if (!isValidcallback)
        return res
          .status(500)
          .json({ status: false, message: "Invalid Callback" });

      const callback = await Callback.findByIdAndUpdate(isValidcallback._id, {
        status: req.query.status,
      });

      return res.status(200).json({ sucess: true, callback });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  }
};

export default withAuth(handler);
