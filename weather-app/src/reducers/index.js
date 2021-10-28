import { combineReducers } from "redux";
import degreeCurrency from "./degreeCurrency";
import cityKey from "./cityKey";
import cityName from "./cityName";

const rootReducer = combineReducers({
  degreeCurrency,
  cityKey,
  cityName,
});

export default rootReducer;
