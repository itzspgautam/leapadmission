import { getStorageAuth } from "@/Storage/AuthStorage";

import AuthActions from "./AuthActions";
import ConfigActions from "./ConfigActions.";
import InvestActions from "./InvestActions";

const types = {
  SET_FIRST_TIME: "SET_FIRST_TIME",
  SET_INTERNET: "SET_INTERNET",
  SET_APP_LOADING: "SET_APP_LOADING",
};

const appStart = () => async (dispatch) => {
  await dispatch(setAppLoading(true));

  //getconfig
  const appDbConfig = await dispatch(ConfigActions.getConfig());
  if (!appDbConfig) {
    alert("Internal Server Error!");
    return;
  }

  //chek if authenticated
  let token;
  const isAutheticated = await getStorageAuth();
  console.log(isAutheticated);
  if (isAutheticated) {
    token = JSON.parse(isAutheticated).token;
    await dispatch(AuthActions.loginUserPermanent(token));
  } else {
    await dispatch(AuthActions.signOut());
  }

  //load Investment
  await dispatch(InvestActions.getAllInvests(token));

  await dispatch(setAppLoading(false));
};

const setAppLoading = (isLoading) => async (dispatch) => {
  await dispatch({
    type: types.SET_APP_LOADING,
    payload: isLoading,
  });
};

export default { types, appStart, setAppLoading };
