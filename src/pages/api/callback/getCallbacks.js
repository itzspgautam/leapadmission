// get all sites of a user
import DbConnect from "@/Config/dbConfig";
import Callback from "@/Models/Callback";
import User from "@/Models/User";
import { withAuth } from "../auth/adminAuth";

const handler = async (req, res) => {
  await DbConnect();
  if (req.method === "POST") {
    try {
      const callbacks = await Callback.find();

      return res.status(200).json({ sucess: true, callbacks });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  }
};

export default withAuth(handler);
