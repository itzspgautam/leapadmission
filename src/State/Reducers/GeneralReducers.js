import GeneralActions from "../Actions/GeneralActions";

const initialState = {
  isFirstTime: true,
  appLoading: true,
  isInternetConnected: true,
};

const GeneralReducers = (state = initialState, action) => {
  switch (action.type) {
    case GeneralActions.types.SET_APP_LOADING:
      return {
        ...state,
        appLoading: action.payload,
      };

    case GeneralActions.types.SET_INTERNET:
      return {
        ...state,
        isInternetConnected: action.payload,
      };

    case GeneralActions.types.SET_FIRST_TIME:
      return {
        ...state,
        isFirstTime: action.payload,
      };
    default:
      return state;
  }
};

export default GeneralReducers;
