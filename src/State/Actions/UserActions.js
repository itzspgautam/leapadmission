import { AppConfig } from "@/Config/AppConfig";
import { setUser } from "@/Utils/AuthStorage";
import axios from "axios";

const { FirebaseAuth } = require("@/Config/FirebaseApp");
const { signInWithPopup, signInWithPhoneNumber } = require("firebase/auth");

const types = {
  LOGIN_REQUEST: "LOGIN_REQUEST",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAIL: "LOGIN_FAIL",

  OTP_SENT_REQUEST: "OTP_SENT_REQUEST",
  OTP_SENT_SUCCESS: "OTP_SENT_SUCCESS",
  OTP_SENT_FAIL: "OTP_SENT_FAIL",

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

const sendOtp = (appVerifier, phone) => async (dispatch) => {
  dispatch({ type: types.OTP_SENT_REQUEST });
  console.log(phone);
  if (phone.length < 10) {
    dispatch({
      type: types.OTP_SENT_FAIL,
      payload: { error: "Please enter valid phone number." },
    });
    return;
  }
  try {
    const phoneOtpRequest = await signInWithPhoneNumber(
      FirebaseAuth,
      "+" + phone,
      appVerifier
    );
    dispatch({
      type: types.OTP_SENT_SUCCESS,
      payload: phoneOtpRequest,
    });
  } catch (error) {
    console.log(error);
    let message = "";
    if (error.code === "auth/invalid-phone-number") {
      message = "Please enter valid phone number";
    }
    if (error.code === "auth/too-many-requests") {
      message = "Too many attempts. Please try again later.";
    }

    dispatch({ type: types.OTP_SENT_FAIL, payload: error });
  }
};

const logout = () => async (dispatch) => {
  dispatch({ type: types.LOGOUT_REQUEST });
  localStorage.clear();
};
const UserActions = { socialLogin, logout, sendOtp, types };
export default UserActions;
