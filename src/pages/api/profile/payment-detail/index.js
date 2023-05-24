import DbConnect from "@/Config/dbConfig";
import { mainAuth } from "@/middleware/isMainAuth";
import PayDetails from "@/models/PayDetails";

const handler = async (req, res) => {
  const { user } = req.auth;
  if (req.method === "POST") {
    try {
      await DbConnect();
      const { paymentType, paymentDetails } = req.body;

      const newPaymentDetails = new PayDetails({
        user: user._id,
        paymentType,
        ...paymentDetails,
      });

      const savedPaymentDetails = await newPaymentDetails.save();

      res
        .status(201)
        .json({ success: true, paymentDetail: savedPaymentDetails });
    } catch (error) {
      res.status(500).json({
        sussess: false,
        error: error.message,
      });
    }
  } else if (req.method === "PUT") {
    try {
      await DbConnect();
      const { paymentType, paymentDetails, PaymentId } = req.body;

      const isValidPaymentDet = await PayDetails.findById(PaymentId);

      if (!isValidPaymentDet) {
        res
          .status(404)
          .json({ success: false, message: "Payment Details not Found." });
      }

      const updatedDetails = await PayDetails.findByIdAndUpdate(
        isValidPaymentDet._id,
        {
          user: user._id,
          paymentType,
          ...paymentDetails,
        },
        { new: true }
      );

      res.status(201).json({ success: true, paymentDetail: updatedDetails });
    } catch (error) {
      res.status(500).json({
        sussess: false,
        error: error.message,
      });
    }
  } else {
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

export default mainAuth(handler);
