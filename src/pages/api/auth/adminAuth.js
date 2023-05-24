import User from "@/models/User";

const admin = require("@/Config/FirebaseAdmin");

export function withAuth(handler) {
  return async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).end("Not authenticated. No Auth header");
    }

    const token = authHeader.split(" ")[1];
    let decodedToken;
    try {
      decodedToken = await admin.auth().verifyIdToken(token);
      const adminRes = await User.findOne({
        uid: decodedToken.uid,
      });

      if (adminRes.role !== "admin") {
        return res
          .status(401)
          .end("You are not authorised to access this resource!");
      }
      req.user = adminRes;
    } catch (error) {
      const errorCode = error?.errorInfo?.code;
      error.status = 401;
      if (errorCode === "auth/internal-error") {
        error.status = 500;
      }
      //TODO handlle firebase admin errors in more detail
      return res.status(error.status).json({
        error: errorCode,
        message: "You don't have permission to access this resource.",
      });
    }

    return handler(req, res);
  };
}
