import { combineReducers } from "redux";
import { charityPrograms } from "./charityPrograms.reducer";
import { donationPreferences } from "./donationPreferences.reducer";
import { corporates } from "./corporates.reducer";
import { individuals } from "./individuals.reducer";
import { employee } from "./employees.reducer";
import { payment } from "./payment.reducer";
import { alert } from "./alert.reducer";
import { transactionsHistory } from "./transactionsHistory.reducer";
import { payrollSetting } from "./payrollSetting.reducer";
import { payrollBatch } from "./payrollBatch.reducer";
import { currentView } from "./currentView.reducer";
import { selectedCorporate } from "./selectedCorporate.reducer";
import { selectedOrganization } from "./selectedOrganization.reducer";
import { socialOrganizations } from "./socialOrganizations.reducer";
import { selectedCharity } from "./selectedCharity.reducer";
import { selectedCharityTab } from "./selectedCharityTab.reducer";
import { user } from "./user.reducer";
import { userConstants } from "../constants";

const MainReducer = combineReducers({
  alert,
  corporates,
  individuals,
  employee,
  charityPrograms,
  donationPreferences,
  payment,
  transactionsHistory,
  payrollSetting,
  payrollBatch,
  currentView,
  selectedCorporate,
  socialOrganizations,
  selectedOrganization,
  selectedCharity,
  selectedCharityTab,
  user,
});

const rootReducer = (state, action) => {
  // const user = JSON.parse(localStorage.getItem("user"));
  if (action.type === userConstants.LOGOUT) {
    state = undefined;
  }
  return MainReducer(state, action);
};

export default rootReducer;
