import { AppConfig } from "@/Config/AppConfig";
import { setUser } from "@/Utils/AuthStorage";
import axios from "axios";

const { FirebaseAuth } = require("@/Config/FirebaseApp");
const { signInWithPopup } = require("firebase/auth");

const types = {
  LOGIN_REQUEST: "LOGIN_REQUEST",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAIL: "LOGIN_FAIL",

  LOGOUT_REQUEST: "LOGOUT_REQUEST",
};

const socialLogin = (provider) => async (dispatch) => {
  dispatch({
    type: types.LOGIN_REQUEST,
  });
  try {
    const { user } = await signInWithPopup(FirebaseAuth, provider);

    setUser(user.accessToken, JSON.stringify(user.providerData[0]));
    dispatch({
      type: types.LOGIN_SUCCESS,
      payload: user.providerData[0],
    });
  } catch (error) {
    var message =
      error.code === "auth/popup-closed-by-user"
        ? ""
        : "Login failed! Please try again.";
    dispatch({
      type: types.LOGIN_FAIL,
      payload: message,
    });
  }
};

const logout = () => async (dispatch) => {
  dispatch({ type: types.LOGOUT_REQUEST });
  localStorage.clear();
};
const UserActions = { socialLogin, logout, types };
export default UserActions;
