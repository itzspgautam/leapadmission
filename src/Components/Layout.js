import UserActions from "@/State/Actions/UserActions";
import { getUser } from "@/utils/AuthStorage";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Whatsapp from "./Whatsapp";
import GeneralActions from "@/State/Actions/GeneralActions";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  // const { user } = useSelector((state) => state.User);
  const router = useRouter();

  useEffect(() => {
    dispatch(GeneralActions.appStart());
  }, []);
  return (
    <>
      {router.pathname.split("/")[1] === "admin" ? (
        <> {children}</>
      ) : (
        <>
          <Navbar />
          {children}
          <Whatsapp />
          <Footer />
        </>
      )}
    </>
  );
};

export default Layout;
