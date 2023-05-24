import { combineReducers } from "redux";
import { UserReducer } from "./UserReducer";
import { AuthCredential } from "firebase/auth";
import AuthReducers from "./AuthReducers";
import GeneralReducers from "./GeneralReducers";
import ConfigReducers from "./Configreducers";
import investReducers from "./InvestReducers";

const Reducers = combineReducers({
  General: GeneralReducers,
  Auth: AuthReducers,
  User: UserReducer,
  Config: ConfigReducers,
  Invest: investReducers,
});

export default Reducers;
