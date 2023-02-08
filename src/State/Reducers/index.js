import { combineReducers } from "redux";
import { UserReducer } from "./UserReducer";
const Reducers = combineReducers({
  User: UserReducer,
});

export default Reducers;
