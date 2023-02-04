import UserActions from "@/State/Actions/UserActions";
import { getUser } from "@/Utils/AuthStorage";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Whatsapp from "./Whatsapp";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.User);

  useEffect(() => {
    getUser().then((user) => {
      if (user) {
        dispatch({
          type: UserActions.types.LOGIN_SUCCESS,
          payload: JSON.parse(user),
        });
      }
    });
  }, []);

  return (
    <>
      <Navbar />
      {children}
      <Whatsapp />
      <Footer />
    </>
  );
};

export default Layout;
