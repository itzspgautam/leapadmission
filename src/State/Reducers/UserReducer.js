import UserActions from "../Actions/UserActions";

const initiState = {
  user: null,
  userError: "",
  userLoading: false,
  phoneAuth: null,
};

export const UserReducer = (state = initiState, action) => {
  switch (action.type) {
    case UserActions.types.LOGIN_REQUEST:
      return {
        ...state,
        userLoading: true,
        userError: "",
      };

    case UserActions.types.LOGIN_SUCCESS:
      return {
        ...state,
        userLoading: false,
        user: action.payload,
        userError: "",
        phoneAuth: null,
      };

    case UserActions.types.LOGIN_FAIL:
      return {
        ...state,
        userLoading: false,
        userError: action.payload,
      };

    case UserActions.types.OTP_SENT_REQUEST:
      return {
        ...state,
        userLoading: true,
        userError: "",
      };

    case UserActions.types.OTP_SENT_SUCCESS:
      return {
        ...state,
        userLoading: false,
        phoneAuth: action.payload,
      };

    case UserActions.types.OTP_SENT_FAIL:
      return {
        ...state,
        userLoading: false,
        userError: action.payload,
      };

    case UserActions.types.LOGOUT_REQUEST:
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};
