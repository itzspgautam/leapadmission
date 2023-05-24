import DbConnect from "@/Config/dbConfig";
import User from "@/models/User";
import { verifyToken } from "@/utils/Token";

export function mainAuth(handler) {
  return async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).end("Not authenticated. No Auth header");
    }

    const token = authHeader.split(" ")[1];
    let decodedId;
    try {
      await DbConnect();

      decodedId = await verifyToken(token);
      const user = await User.findById(decodedId);
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Session Expired. Please login again.",
        });
      }

      req.auth = { user, token };
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "You don't have permission to access this resource.",
      });
    }

    return handler(req, res);
  };
}
