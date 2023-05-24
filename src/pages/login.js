import { LoginDrawer } from "@/Components";
import React from "react";
import { useSelector } from "react-redux";

const Login = ({ children }) => {
  const { auth } = useSelector((State) => State.Auth);

  return auth ? <>{children}</> : <LoginDrawer />;
};

export default Login;
