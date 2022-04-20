import { employeeConstants } from "../constants";

let user = JSON.parse(localStorage.getItem("user"));
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case employeeConstants.EMPLOYEE_LOGIN_REQUEST:
      return {
        loggingIn: true,
      };
    case employeeConstants.EMPLOYEE_LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action?.data?.data,
      };
    case employeeConstants.EMPLOYEE_LOGIN_FAILURE:
      return { loggingIn: false };
    case employeeConstants.EMPLOYEE_LOGOUT:
      return {};
    default:
      return state;
  }
}
