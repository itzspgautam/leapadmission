const admin = require("../Config/FirebaseAdmin");

export function firebaseAuth(handler) {
  return async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).end("Not authenticated. No Auth header");
    }

    const token = authHeader.split(" ")[1];
    let decodedToken;
    try {
      decodedToken = await admin.auth().verifyIdToken(token);
      //   const adminRes = await User.findOne({
      //     uid: decodedToken.uid,
      //   });
      req.user = decodedToken;
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
