import { combineReducers } from "redux";

import { authentication } from "./authentication.reducer";
import { registration } from "./registration.reducer";
import { users } from "./users.reducer";
import { corporates } from "./corporates.reducer";
import { employees } from "./employees.reducer";
import { alert } from "./alert.reducer";

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  corporates,
  alert,
  employees,
});

export default rootReducer;
