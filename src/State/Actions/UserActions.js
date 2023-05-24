import { AppConfig } from "@/Config/AppConfig";
import { setUser } from "@/utils/AuthStorage";
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
    z;
    const { user } = await signInWithPopup(FirebaseAuth, provider);

    const data = await saveUser(user);
    setUser(user.accessToken, JSON.stringify(data.user));
    dispatch({
      type: types.LOGIN_SUCCESS,
      payload: data.user,
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

  if (phone.length < 10) {
    dispatch({
      type: types.OTP_SENT_FAIL,
      payload: "Please enter valid phone number.",
    });
    return;
  }
  try {
    const confirmationResult = await signInWithPhoneNumber(
      FirebaseAuth,
      "+" + phone,
      appVerifier
    );

    dispatch({
      type: types.OTP_SENT_SUCCESS,
      payload: { confirmationResult, status: "sent", phone: "+" + phone },
    });

    return;
  } catch (error) {
    let message = "Something went wrong";
    if (error.code === "auth/invalid-phone-number") {
      message = "Please enter valid phone number";
    }
    if (error.code === "auth/too-many-requests") {
      message = "Too many attempts. Please try again later.";
    }

    dispatch({ type: types.OTP_SENT_FAIL, payload: message });
  }
};

const verifyOtp = (confirmationResult, enetredOtp) => async (dispatch) => {
  dispatch({
    type: types.LOGIN_REQUEST,
  });
  try {
    const { user } = await confirmationResult.confirm(enetredOtp);
    const data = await saveUser(user);
    setUser(user.accessToken, JSON.stringify(data.user));
    dispatch({
      type: types.LOGIN_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    let message = "";
    if (error.code === "auth/invalid-verification-code") {
      message = "Incorrect OTP. Please try again.";
    }
    dispatch({
      type: types.LOGIN_FAIL,
      payload: error,
    });
  }
};

const saveUser = async (user) => {
  try {
    const { data } = await axios.post(
      process.env.ENDPOINT + "/api/auth/register",
      { ...user.providerData[0], uid: user.uid }
    );
    return data;
  } catch (error) {
    return error?.response?.data?.message;
  }
};

const logout = () => async (dispatch) => {
  dispatch({ type: types.LOGOUT_REQUEST });
  localStorage.clear();
};
const UserActions = { socialLogin, logout, sendOtp, verifyOtp, types };
export default UserActions;
