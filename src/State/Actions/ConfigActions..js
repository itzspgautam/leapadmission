import axios from "axios";
import { AppConfig } from "@/Config/AppConfig";

const types = {
  GET_CONFIG_SUCCESS: "GET_CONFIG_SUCCESS",
  GET_CONFIG_FAIL: "GET_CONFIG_FAIL",
};

const getConfig = () => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `${AppConfig.API_ENDPOINT}/api/admin/config/get`
    );
    console.log("Config", data.config[0]);
    dispatch({ type: types.GET_CONFIG_SUCCESS, payload: data.config[0] });
    return true;
  } catch (error) {
    let message = error?.response
      ? error.response.data.error
      : "Internal Server Down!  " + error;
    dispatch({ type: types.GET_CONFIG_FAIL, payload: message });
    return false;
  }
};

export default { types, getConfig };
