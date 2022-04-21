import { combineReducers } from "redux";

import { employee } from "./employees.reducer";
import { alert } from "./alert.reducer";

const rootReducer = combineReducers({
  alert,
  employee,
});

export default rootReducer;
