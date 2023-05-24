const Razorpay = require("razorpay");

const RazorpayConfig = new Razorpay({
  key_id: process.env.RZP_KEY,
  key_secret: process.env.RZP_SECRET,
});

module.exports = RazorpayConfig;
