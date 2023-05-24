import Colors from "@/Constants/Colors";
import InvestActions from "@/State/Actions/InvestActions";
import { useCallback } from "react";
import useRazorpay from "react-razorpay";
import { useDispatch, useSelector } from "react-redux";

export default function Pay({ children, investment, order }) {
  const Razorpay = useRazorpay();
  const dispatch = useDispatch();

  const { auth } = useSelector((State) => State.Auth);

  const handlePayment = useCallback(async () => {
    var options = {
      description: "Payment for The Capitals Investment",
      image: "https://i.imgur.com/3g7nmJC.png",
      currency: "INR",
      key: "rzp_test_63EEaKdNr0W0qN", // Your api key
      name: "The Capitals",
      order_id: order.id,
      handler: (payment) => {
        console.log(payment);
        dispatch(
          InvestActions.saveInvestmentAndPay(investment, order, payment, auth)
        );
      },
      prefill: {
        email: order?.notes?.customer_email,
        contact: order?.notes?.customer_contact,
        name: order?.notes?.customer_name,
      },
      theme: { color: Colors.PRIMARY[500] },
    };

    const rzpay = new Razorpay(options);
    rzpay.open();
  }, [Razorpay, order]);

  return <span onClick={handlePayment}>{children}</span>;
}
