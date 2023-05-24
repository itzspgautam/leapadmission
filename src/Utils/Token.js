const jwt = require("jsonwebtoken");

export const generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "30d" });
  return token;
};

export const verifyToken = (token) => {
  const _id = jwt.verify(token, process.env.JWT_SECRET);
  return _id;
};
