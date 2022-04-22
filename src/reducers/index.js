import { combineReducers } from "redux";
import { charityPrograms } from "./charityPrograms.reducer";
import { employee } from "./employees.reducer";
import { alert } from "./alert.reducer";

const rootReducer = combineReducers({
  alert,
  employee,
  charityPrograms,
});

export default rootReducer;
