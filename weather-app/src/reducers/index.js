import { combineReducers } from "redux";
import cityKey from "./cityKey";
import degreeCurrency from "./degreeCurrency";
const rootReducer = combineReducers({
  degreeCurrency,
  cityKey,
});

export default rootReducer;
