import RazorpayConfig from "@/Config/razorpay";

export const CreateOrder = async (options) => {
  try {
    const order = await RazorpayConfig.orders.create(options);
    return order;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getOrderById = async (orderId) => {
  try {
    const order = await RazorpayConfig.orders.fetch(orderId);
    return order;
  } catch (error) {
    console.log(error);
    return error;
  }
};
