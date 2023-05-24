import { mainAuth } from "@/middleware/isMainAuth";

const handler = async (req, res) => {
  if (req.method === "POST") {
    return res
      .status(201)
      .json({ success: true, user: req.auth.user, token: req.auth.token });
  } else {
    return res
      .status(400)
      .json({ success: false, error: "Invalid Request. Unauthorised" });
  }
};

export default mainAuth(handler);
