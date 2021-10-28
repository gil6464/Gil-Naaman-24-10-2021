import { combineReducers } from "redux";
import degreeCurrency from "./degreeCurrency";
import cityKey from "./cityKey";
import cityName from "./cityName";
import darkMode from "./darkMode";

const rootReducer = combineReducers({
  degreeCurrency,
  cityKey,
  cityName,
  darkMode,
});

export default rootReducer;
