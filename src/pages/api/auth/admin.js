// get all sites of a user
import DbConnect from "@/Config/dbConfig";
import User from "@/models/User";
import { withAuth } from "./adminAuth";

const handler = async (req, res) => {
  await DbConnect();
  try {
    return res.status(200).json({ sucess: true, admin: req.user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export default withAuth(handler);
