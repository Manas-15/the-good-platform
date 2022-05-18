import { combineReducers } from "redux";
import { charityPrograms } from "./charityPrograms.reducer";
import { donationPreferences } from "./donationPreferences.reducer";
import { corporates } from "./corporates.reducer";
import { employee } from "./employees.reducer";
import { payment } from "./payment.reducer";
import { alert } from "./alert.reducer";
import { transactionsHistory } from "./transactionsHistory.reducer";
import { payrollSetting } from "./payrollSetting.reducer";
import { payrollBatch } from "./payrollBatch.reducer";
import { currentView } from "./currentView.reducer";

const rootReducer = combineReducers({
  alert,
  corporates,
  employee,
  charityPrograms,
  donationPreferences,
  payment,
  transactionsHistory,
  payrollSetting,
  payrollBatch,
  currentView,
});

export default rootReducer;
