import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Whatsapp from "./Whatsapp";

const Layout = ({ children }) => {
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
