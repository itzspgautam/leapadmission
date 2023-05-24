import RazorpayConfig from "@/Config/razorpay";

export const getPaymentById = async (paymentId) => {
  try {
    const payment = await RazorpayConfig.payments.fetch(paymentId);
    return payment;
  } catch (error) {
    console.log(error);
    return error;
  }
};
