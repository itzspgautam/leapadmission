import RazorpayConfig from "@/config/razorpay";

export const verifyRzpPayment = async (paymentId, paymentRef) => {
  try {
    const order = await RazorpayConfig.orders.fetch(paymentRef);
    console.log("order", order);
    if (order.status !== "paid") return false;

    const payment = await RazorpayConfig.payments.fetch(paymentId);
    console.log(payment);
    if (!payment) return false;

    if (payment.order_id !== paymentRef) return false;

    return true;
  } catch (error) {
    return false;
  }
};
