import { AppConfig } from "@/Config/AppConfig";
import { setStorageAuth } from "@/Storage/AuthStorage";

const { FirebaseAuth } = require("@/Config/FirebaseApp");
const {
  signInWithPopup,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  GoogleAuthProvider,
  signInWithCredential,
  linkWithCredential,
  linkWithPopup,
  linkWithRedirect,
} = require("firebase/auth");

import axios from "axios";

// import ReferActions from "./ReferActions";
// import { getReferalStorage } from "../../Storage/ReferalStorage";

// Configure Google Sign-In
// GoogleSignin.configure({
//   webClientId:
//     "978227618795-57d1in7ooigmissp3pum2vb096oaepcd.apps.googleusercontent.com", // From Firebase Console
// });

const types = {
  SEND_OTP_REQ: "SEND_OTP_REQ",
  SEND_OTP_SUCCESS: "SEND_OTP_SUCCESS",
  SEND_OTP_FAIL: "SEND_OTP_FAIL",

  VERIFY_OTP_REQ: "VERIFY_OTP_REQ",
  VERIFY_OTP_SUCCESS: "VERIFY_OTP_SUCCESS",
  VERIFY_OTP_FAIL: "VERIFY_OTP_FAIL",

  GOOGLE_LOGIN_REQ: "GOOGLE_LOGIN_REQ",
  GOOGLE_LOGIN_SUCCESS: "GOOGLE_LOGIN_SUCCESS",
  GOOGLE_LOGIN_FAIL: "GOOGLE_LOGIN_FAIL",

  AUTH_SUCCESS: "AUTH_SUCCESS",
  AUTH_FAIL: "AUTH_FAIL",

  SIGN_OUT_SUCCESS: "SIGN_OUT_SUCCESS",
  SIGN_OUT_FAIL: "SIGN_OUT_FAIL",

  AUTH_CLEAR_ERROR: "AUTH_CLEAR_ERROR",
};

//Login with phone (Request OTP)
const loginWithPhone = (phoneNumber, appVerifier) => async (dispatch) => {
  console.log(FirebaseAuth.currentUser);
  dispatch({ type: types.SEND_OTP_REQ });
  if (!phoneNumber || phoneNumber.length < 10) {
    await dispatch({
      type: types.SEND_OTP_FAIL,
      payload: "Please enter valid phone number",
    });
    dispatch(clearError());
    return;
  }
  try {
    if (FirebaseAuth.currentUser) {
      console.log("alredy logged found");
      const isAlreadyReg = await dispatch(
        isPhoneAlreadyRegistered(phoneNumber)
      );
      console.log(isAlreadyReg);
      if (!isAlreadyReg.success) return;
    }
    console.log("appv", appVerifier);
    const confirmation = await signInWithPhoneNumber(
      FirebaseAuth,
      "+" + phoneNumber,
      appVerifier
    );
    console.log("conf", confirmation);
    dispatch({ type: types.SEND_OTP_SUCCESS, payload: confirmation });
    console.log("Sent", confirmation);
    return true;
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.SEND_OTP_FAIL,
      payload: "Something went wrong!",
    });
    dispatch(clearError());
  }
};

//Chek phone availbility
const isPhoneAlreadyRegistered = (phone) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${AppConfig.API_ENDPOINT}api/auth/phone`,
      {
        phone: `+${phone}`,
      }
    );
    return data;
  } catch (error) {
    console.log(error.response.data.error);
    dispatch({
      type: types.SEND_OTP_FAIL,
      payload: error.response.data.error,
    });
    dispatch(clearError());
    return error.response.data;
  }
};

//Login with phone (Verify OTP)
const verifyPhone = (verificationId, otp) => async (dispatch) => {
  dispatch({ type: types.VERIFY_OTP_REQ });
  console.log(otp);
  if (!otp || otp.length !== 6) {
    await dispatch({
      type: types.SEND_OTP_FAIL,
      payload: "Please enter valid OTP.",
    });
    dispatch(clearError());
    return;
  }

  try {
    console.log("Ver id", verificationId);
    const phoneCredential = PhoneAuthProvider.credential(
      verificationId.verificationId,
      otp
    );

    if (FirebaseAuth.currentUser) {
      const linked = await linkWithCredential(
        FirebaseAuth.currentUser,
        phoneCredential
      );
      console.log(linked);
      dispatch(
        registerUser({
          name: linked.user.displayName,
          avatar: linked.user.photoURL,
        })
      );
    }

    await signInWithCredential(FirebaseAuth, phoneCredential);
    console.log("Logged", FirebaseAuth.currentUser);

    if (FirebaseAuth.currentUser.email === null) {
      console.log("Email not found");

      dispatch({
        type: types.VERIFY_OTP_SUCCESS,
        payload: FirebaseAuth.currentUser,
      });
      dispatch(loginWithGoogle());
      return null;
    }

    await dispatch(loginUser());
    dispatch({
      type: types.VERIFY_OTP_SUCCESS,
      payload: FirebaseAuth.currentUser,
    });
    return null;
  } catch (error) {
    console.log("Invalid code.", error);
    await dispatch({
      type: types.SEND_OTP_FAIL,
      payload: "Please enter valid OTP.",
    });
    dispatch(clearError());
  }
};

const loginWithGoogle = () => async (dispatch) => {
  dispatch({ type: types.GOOGLE_LOGIN_REQ });
  try {
    const provider = new GoogleAuthProvider();

    //If already logged in with phone number then link email
    if (FirebaseAuth.currentUser) {
      console.log("user found ", FirebaseAuth.currentUser);
      const linked = await linkWithPopup(FirebaseAuth.currentUser, provider);

      console.log(linked);
      // dispatch(
      //   registerUser(
      //     {
      //       name: linked._tokenResponse.displayName,
      //       avatar: linked._tokenResponse.photoUrl,
      //     },
      //     navigation
      //   )
      // );
      dispatch({
        type: types.GOOGLE_LOGIN_SUCCESS,
        payload: FirebaseAuth.currentUser,
      });
      return null;
    }

    await signInWithPopup(FirebaseAuth, provider);

    if (FirebaseAuth.currentUser.phoneNumber === null) {
      console.log("phone login not found");
      dispatch({
        type: types.GOOGLE_LOGIN_SUCCESS,
        payload: FirebaseAuth.currentUser,
      });
      // navigation.navigate("PhoneInput");
      return null;
    }
    await dispatch(loginUser());
    return null;
  } catch (error) {
    console.log(error);

    if (error.code === "auth/credential-already-in-use") {
      await GoogleSignin.revokeAccess();
      dispatch({
        type: types.GOOGLE_LOGIN_FAIL,
        payload:
          "This email is already associated with a different user account. Please select another account.",
      });
    } else if (error.code === "12501") {
      dispatch({
        type: types.GOOGLE_LOGIN_FAIL,
        payload: "Looks like you didn't selected email. Please try again.",
      });
    } else if (error.code === "auth/unknown") {
      dispatch(signOut());
    } else {
      dispatch({
        type: types.GOOGLE_LOGIN_FAIL,
        payload: `Simething went wrong. error code: ${error.code}`,
      });
    }
  }
};

const registerUser = (userData, navigation) => async (dispatch) => {
  console.log("Register ", userData);
  try {
    let token = FirebaseAuth.currentUser.accessToken;
    console.log(token);
    const registerUser = await axios.post(
      `${AppConfig.API_ENDPOINT}api/auth/register`,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    //Register refereal if referid found in storage
    // const referId = await getReferalStorage();
    // if (referId) {
    //   await dispatch(
    //     ReferActions.createReferal(registerUser.data.token, JSON.parse(referId))
    //   );
    // }

    await dispatch(
      setAuth({ user: registerUser.data.user, token: registerUser.data.token })
    );
    return null;
  } catch (error) {
    console.log(error.response.data);
  }
};

const loginUser = () => async (dispatch) => {
  //this function is only for verify firebase auth and temporary
  try {
    let token = await FirebaseAuth.currentUser.accessToken;
    const loginUser = await axios.post(
      `${AppConfig.API_ENDPOINT}api/auth/login`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    await dispatch(
      setAuth({ user: loginUser.data.user, token: loginUser.data.token })
    );
    return null;
  } catch (error) {
    console.log(error);
    dispatch(signOut());
  }
};

const loginUserPermanent = (token) => async (dispatch) => {
  try {
    const loginUser = await axios.post(
      `${AppConfig.API_ENDPOINT}/api/auth/login-main`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    await dispatch(
      setAuth({ user: loginUser?.data.user, token: loginUser?.data.token })
    );
    return null;
  } catch (error) {
    console.log("loginUserPermanent", error);
  }
};

const setAuth = (auth) => async (dispatch) => {
  await setStorageAuth({
    user: auth.user,
    token: auth.token,
  });
  await dispatch({ type: types.AUTH_SUCCESS, payload: auth });
};

const signOut = () => async (dispatch) => {
  if (FirebaseAuth.currentUser) {
    await FirebaseAuth?.signOut();
  }

  dispatch({ type: types.SIGN_OUT_SUCCESS });
};

const clearError = () => async (dispatch) => {
  dispatch({ type: types.AUTH_CLEAR_ERROR });
};

export default {
  types,
  loginWithPhone,
  verifyPhone,
  loginWithGoogle,
  loginUser,
  loginUserPermanent,
  setAuth,
  signOut,
};
