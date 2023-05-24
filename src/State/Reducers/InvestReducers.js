import InvestActions from "../Actions/InvestActions";

const initialState = {
  investments: null,
  investLoading: false,
  selected: null,

  init: {
    investment: null,
    order: null,
  },
  payLoading: false,
  created: null,
  investError: null,

  withdraw: null,
  withdrawLoading: false,
  selectedWithdraw: null,
  withdrawRequest: null,
  withdrawError: null,
};

const investReducers = (state = initialState, action) => {
  switch (action.type) {
    case InvestActions.types.INVEST_LOAD_REQUEST:
      return {
        ...state,
        investLoading: true,
      };

    case InvestActions.types.INVEST_LOAD_SUCCESS:
      return {
        ...state,
        investLoading: false,
        investments: action.payload,
      };

    case InvestActions.types.INVEST_LOAD_FAIL:
      return {
        ...state,
        investLoading: false,
      };

    case InvestActions.types.INVEST_INFO_LOAD_REQUEST:
      return {
        ...state,
        investLoading: true,
      };

    case InvestActions.types.INVEST_INFO_LOAD_SUCCESS:
      return {
        ...state,
        investLoading: false,
        selected: action.payload,
      };

    case InvestActions.types.INVEST_INFO_LOAD_FAIL:
      return {
        ...state,
        selected: null,
        investLoading: false,
      };

    case InvestActions.types.INVEST_REQUEST:
      return {
        ...state,
        investLoading: true,
        investError: null,
      };

    case InvestActions.types.INVEST_INIT_REQ:
      return {
        ...state,
        payLoading: true,
      };

    case InvestActions.types.INVEST_INIT:
      return {
        ...state,
        init: action.payload,
      };

    case InvestActions.types.INVEST_SUCCESS:
      return {
        ...state,
        investLoading: false,
        investError: null,
      };

    case InvestActions.types.INVEST_FAIL:
      return {
        ...state,
        investLoading: false,
        investError: action.payload,
      };

    case InvestActions.types.WITHDRAW_INFO_LOAD_REQUEST:
      return {
        ...state,
        withdrawLoading: true,
      };

    case InvestActions.types.WITHDRAW_INFO_LOAD_SUCCESS:
      return {
        ...state,
        withdrawLoading: false,
        selectedWithdraw: action.payload,
      };

    case InvestActions.types.WITHDRAW_INFO_LOAD_FAIL:
      return {
        ...state,
        selectedWithdraw: null,
        withdrawLoading: false,
        withdrawError: action.payload,
      };

    case InvestActions.types.WITHDRAW_REQUEST:
      return {
        ...state,
        withdrawLoading: true,
      };

    case InvestActions.types.WITHDRAW_SUCCESS:
      return {
        ...state,
        withdrawLoading: false,
        withdrawRequest: action.payload,
      };

    case InvestActions.types.WITHDRAW_FAIL:
      return {
        ...state,
        withdrawRequest: null,
        withdrawLoading: false,
        withdrawError: action.payload,
      };

    case InvestActions.types.INVEST_CLEAR_ERROR:
      return {
        ...state,
        investError: null,
        withdrawError: null,
      };
    default:
      return state;
  }
};

export default investReducers;
