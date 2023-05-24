import axios from "axios";
import { AppConfig } from "@/Config/AppConfig";

import {
  getInitInvest,
  removeInitInvest,
  setInitInvest,
} from "../../Storage/InvestStorage";

const types = {
  INVEST_REQUEST: "INVEST_REQUEST",
  INVEST_INIT_REQ: "INVEST_INIT_REQ",
  INVEST_INIT: "INVEST_INIT",
  INVEST_SUCCESS: "INVEST_SUCCESS",
  INVEST_FAIL: "INVEST_FAIL",

  INVEST_LOAD_REQUEST: "INVEST_LOAD_REQUEST",
  INVEST_LOAD_SUCCESS: "INVEST_LOAD_SUCCESS",
  INVEST_LOAD_FAIL: "INVEST_LOAD_FAIL",

  INVEST_INFO_LOAD_REQUEST: "INVEST_INFO_LOAD_REQUEST",
  INVEST_INFO_LOAD_SUCCESS: "INVEST_INFO_LOAD_SUCCESS",
  INVEST_INFO_LOAD_FAIL: "INVEST_INFO_LOAD_FAIL",

  WITHDRAW_INFO_LOAD_REQUEST: "WITHDRAW_INFO_LOAD_REQUEST",
  WITHDRAW_INFO_LOAD_SUCCESS: "WITHDRAW_INFO_LOAD_SUCCESS",
  WITHDRAW_INFO_LOAD_FAIL: "WITHDRAW_INFO_LOAD_FAIL",

  WITHDRAW_REQUEST: "WITHDRAW_REQUEST",
  WITHDRAW_SUCCESS: "WITHDRAW_SUCCESS",
  WITHDRAW_FAIL: "WITHDRAW_FAIL",

  INVEST_CLEAR_ERROR: "INVEST_CLEAR_ERROR",
};

//Invest workflow
const createInvest = (investData, navigation) => async (dispatch) => {
  dispatch({ type: types.INVEST_REQUEST });
  try {
    const {
      payAmount,
      auth,
      amount,
      duration,
      emiDuration,
      intrest,
      paymentType,
    } = investData;

    //Initialise Investment
    const initInvestData = {
      amount,
      duration,
      paymentType,
      emiDuration,
    };
    const { investment } = await dispatch(initInvest(initInvestData, auth));
    console.log("Init Investment", investment);

    //Initilise Payment
    const paymentData = {
      invest: investment._id,
      month: 1,
    };

    const { order } = await dispatch(initPayment(paymentData, auth));
    console.log("Init Payment", order);

    //payment initiated
    await dispatch({ type: types.INVEST_INIT, payload: { investment, order } });

    return;
  } catch (error) {
    let message = error?.response ? error.response.data.error : error.message;
    await dispatch({ type: types.INVEST_FAIL, payload: message });
    await dispatch(clearError());
  }
};

//Invest workflow save payment
const saveInvestmentAndPay =
  (investment, order, payment, auth) => async (dispatch) => {
    dispatch({ type: types.INVEST_INIT_REQ });

    try {
      //Save Payment
      const transactionData = {
        invest: investment._id,
        month: 1,
        amount: order.amount / 100,
        status: "success",
        paymentId: payment?.razorpay_payment_id,
        paymentRef: payment?.razorpay_order_id,
        paymentMode: "Razorpay",
      };

      const transaction = await dispatch(
        createTransaction(transactionData, auth)
      );

      console.log("created Transaction", transaction);

      await removeInitInvest();
      await dispatch({ type: types.INVEST_SUCCESS });
      await dispatch(getAllInvests(auth.token));
      navigation.navigate(`/invest/${investment._id}`);
      return;
    } catch (error) {
      console.log(error);
    }
  };

//Invest Emi pay workflow
const payInvestEmi = (emiData) => async (dispatch) => {
  console.log(emiData);
  dispatch({ type: types.INVEST_REQUEST });
  try {
    const { invest, month, auth } = emiData;

    //Initilise Payment
    const paymentData = {
      invest,
      month,
    };
    const { order } = await dispatch(initPayment(paymentData, auth));
    console.log("Init Payment", order);

    //Make Payment
    const { payment } = await RazorPay(order);
    console.log("rzp", payment);

    //Save Payment
    const transactionData = {
      invest,
      month,
      amount: order.amount / 100,
      status: "success",
      paymentId: payment?.razorpay_payment_id,
      paymentRef: payment?.razorpay_order_id,
      paymentMode: "Razorpay",
    };

    const transaction = await dispatch(
      createTransaction(transactionData, auth)
    );

    console.log("created Transaction", transaction);
    dispatch(getInvestInfo(auth.token, invest));
    dispatch(getAllInvests(auth.token));

    return;
  } catch (error) {
    let message = error?.response ? error.response.data.error : error.message;
    dispatch({ type: types.INVEST_FAIL, payload: message });
    dispatch(clearError());
  }
};

//Init Invest
const initInvest = (initInvestData, auth) => async (dispatch) => {
  try {
    //Find if inactive investment is avalable in storage and update it accordingly
    const isInvestAvailable = await getInitInvest();
    console.log("initInvest Storeage", isInvestAvailable);
    if (isInvestAvailable) {
      const invest = JSON.parse(isInvestAvailable).investment._id;
      const { data } = await axios.put(
        `${AppConfig.API_ENDPOINT}/api/invest/init`,
        { invest, ...initInvestData },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      return data;
    }
    //Initialise new investment
    const { data } = await axios.post(
      `${AppConfig.API_ENDPOINT}/api/invest/init`,
      initInvestData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      }
    );
    await setInitInvest(data);
    return data;
  } catch (error) {
    console.log(error.response.data);
    return error.response;
  }
};

//Init payment
const initPayment = (paymentData, auth) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${AppConfig.API_ENDPOINT}/api/payment/init`,
      paymentData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      }
    );
    return data;
  } catch (error) {
    return error?.response?.data;
  }
};

//Save Tranaction
const createTransaction = (transactionData, auth) => async (dispatch) => {
  console.log("tr data", transactionData);
  try {
    const { data } = await axios.post(
      `${AppConfig.API_ENDPOINT}/api/payment/save`,
      transactionData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      }
    );
    return data.transaction;
  } catch (error) {
    let message = error?.response ? error.response.data.error : error;
    console.log(message);
    dispatch({ type: types.INVEST_FAIL, payload: message });
    dispatch(clearError());
  }
};

//get all investments
const getAllInvests = (token) => async (dispatch) => {
  dispatch({ type: types.INVEST_LOAD_REQUEST });
  try {
    const { data } = await axios.post(
      `${AppConfig.API_ENDPOINT}/api/invest/all`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: types.INVEST_LOAD_SUCCESS, payload: { ...data } });
  } catch (error) {
    let message = error?.response ? error.response.data.error : error;
    dispatch({ type: types.INVEST_FAIL, payload: message });
    dispatch(clearError());
  }
};

//get single investments
const getInvestInfo = (token, id) => async (dispatch) => {
  dispatch({ type: types.INVEST_INFO_LOAD_REQUEST });
  try {
    const { data } = await axios.post(
      `${AppConfig.API_ENDPOINT}/api/invest/${id}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({
      type: types.INVEST_INFO_LOAD_SUCCESS,
      payload: data.investment,
    });
  } catch (error) {
    console.log(error);
    let message = error?.response ? error.response.data.error : error;
    console.log(message);
    await dispatch({ type: types.INVEST_FAIL, payload: message });
    dispatch(clearError());
  }
};

//WITHDRAW INVESTMENT

const getWithdrawInfo = (invest, auth) => async (dispatch) => {
  console.log("Called", invest);
  dispatch({ type: types.WITHDRAW_INFO_LOAD_REQUEST });
  try {
    const { data } = await axios.post(
      `${AppConfig.API_ENDPOINT}/api/withdraw/get`,
      { invest },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth?.token}`,
        },
      }
    );
    console.log("loaded info with", data);
    dispatch({ type: types.WITHDRAW_INFO_LOAD_SUCCESS, payload: data });
  } catch (error) {
    console.log("from getwithdraw info", error.response.data);
    let message = error?.response ? error.response.data.error : error;
    dispatch({ type: types.WITHDRAW_INFO_LOAD_FAIL, payload: message });
    dispatch(clearError());
  }
};

const requestWithdraw =
  (invest, payDetail, auth, navigation) => async (dispatch) => {
    dispatch({ type: types.WITHDRAW_REQUEST });

    console.log(payDetail);
    if (!payDetail) {
      await dispatch({
        type: types.WITHDRAW_FAIL,
        payload: "Please slect payment details where you want to withdraw.",
      });
      await dispatch(clearError());
      return;
    }
    try {
      const { data } = await axios.post(
        `${AppConfig.API_ENDPOINT}/api/withdraw`,
        { invest, payDetail },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      await dispatch(getAllInvests(auth?.token));
      await dispatch(getInvestInfo(auth?.token, invest));

      await dispatch({ type: types.WITHDRAW_SUCCESS, payload: data });

      navigation.navigate("InvestInfo", {
        id: invest,
      });
    } catch (error) {
      console.log(error?.response?.data);
      let message = error?.response ? error.response.data.error : error;
      dispatch({ type: types.WITHDRAW_FAIL, payload: message });
      dispatch(clearError());
    }
  };

const clearError = () => async (dispatch) => {
  dispatch({ type: types.INVEST_CLEAR_ERROR });
};

export default {
  types,
  createInvest,
  saveInvestmentAndPay,
  payInvestEmi,
  getAllInvests,
  getInvestInfo,
  getWithdrawInfo,
  requestWithdraw,
};
