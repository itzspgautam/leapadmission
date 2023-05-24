import ConfigActions from "../Actions/ConfigActions.";

const initialState = {
  config: null,
  configError: null,
};

const ConfigReducers = (state = initialState, action) => {
  switch (action.type) {
    case ConfigActions.types.GET_CONFIG_SUCCESS:
      return {
        ...state,
        config: action.payload,
      };

    case ConfigActions.types.GET_CONFIG_FAIL:
      return {
        ...state,
        config: null,
        configError: action.payload,
      };

    default:
      return state;
  }
};

export default ConfigReducers;
