import AuthActions from "../Actions/AuthActions";

const initialState = {
  logAuth: null,
  auth: null,
  verificationId: null,
  authError: null,
  authLoading: false,
};

const AuthReducers = (state = initialState, action) => {
  switch (action.type) {
    case AuthActions.types.SEND_OTP_REQ:
      return {
        ...state,
        authLoading: true,
      };
    case AuthActions.types.SEND_OTP_SUCCESS:
      return {
        ...state,
        authLoading: false,
        verificationId: action.payload,
      };
    case AuthActions.types.SEND_OTP_FAIL:
      return {
        ...state,
        authLoading: false,
        authError: action.payload,
      };

    case AuthActions.types.VERIFY_OTP_REQ:
      return {
        ...state,
        authLoading: true,
      };
    case AuthActions.types.VERIFY_OTP_SUCCESS:
      return {
        ...state,
        authLoading: false,
        verificationId: null,
        logAuth: action.payload,
      };
    case AuthActions.types.VERIFY_OTP_FAIL:
      return {
        ...state,
        authLoading: false,
        authError: action.payload,
      };

    case AuthActions.types.GOOGLE_LOGIN_REQ:
      return {
        ...state,
        authLoading: true,
      };
    case AuthActions.types.GOOGLE_LOGIN_SUCCESS:
      return {
        ...state,
        authLoading: false,
        logAuth: action.payload,
      };
    case AuthActions.types.GOOGLE_LOGIN_FAIL:
      return {
        ...state,
        authLoading: false,
        authError: action.payload,
      };

    case AuthActions.types.AUTH_SUCCESS:
      return {
        ...state,
        authLoading: false,
        auth: action.payload,
        logAuth: null,
      };
    case AuthActions.types.AUTH_FAIL:
      return {
        ...state,
        authLoading: false,
        auth: null,
        authError: action.payload,
      };

    case AuthActions.types.SIGN_OUT_SUCCESS:
      return {
        ...state,
        authLoading: false,
        auth: null,
      };
    case AuthActions.types.SIGN_OUT_FAIL:
      return {
        ...state,
        authLoading: false,
        authError: action.payload,
      };

    case AuthActions.types.AUTH_CLEAR_ERROR:
      return {
        ...state,
        authError: null,
      };

    default:
      return state;
  }
};

export default AuthReducers;
