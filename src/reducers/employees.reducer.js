import { employeeConstants } from "../constants";

export function employee(state = {}, action) {
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
    case employeeConstants.VALIDATE_OTP_REQUEST:
      return {
        validitingOtp: true,
      };
    case employeeConstants.VALIDATE_OTP_SUCCESS:
      return {
        validitedOtp: true,
        user: action?.data?.data,
      };
    case employeeConstants.VALIDATE_OTP_FAILURE:
      return { validitingOtp: false };
    case employeeConstants.RESEND_OTP_REQUEST:
      return {
        resendOtp: true,
      };
    case employeeConstants.RESEND_OTP_SUCCESS:
      return {
        resentdOtp: true,
      };
    case employeeConstants.RESEND_OTP_FAILURE:
      return { resendOtp: false };
    case employeeConstants.EMPLOYEE_LOGOUT:
      return {};
    case employeeConstants.GET_EMPLOYEES_REQUEST:
      return {
        loading: true,
      };
    case employeeConstants.GET_EMPLOYEES_SUCCESS:
      return {
        items: action.employees?.data?.employees,
      };
    case employeeConstants.GET_EMPLOYEES_FAILURE:
      return {
        error: action.error,
      };
    case employeeConstants.ADD_EMPLOYEE_REQUEST:
      return { addingEmployee: true };
    case employeeConstants.ADD_EMPLOYEE_SUCCESS:
      return {};
    case employeeConstants.ADD_EMPLOYEE_FAILURE:
      return {};
    case employeeConstants.GET_EMPLOYEE_REQUEST:
      return { updatingEmployee: true };
    case employeeConstants.GET_EMPLOYEE_SUCCESS:
      return { item: action.employees?.data?.employee };
    case employeeConstants.GET_EMPLOYEE_FAILURE:
      return { error: action.error };
    case employeeConstants.UPDATE_EMPLOYEE_REQUEST:
      return { updatingEmployee: true };
    case employeeConstants.UPDATE_EMPLOYEE_SUCCESS:
      return { item: action.employees?.data?.employee };
    case employeeConstants.UPDATE_EMPLOYEE_FAILURE:
      return { error: action.error };
    case employeeConstants.SAVE_EMPLOYEE_PASSWORD_REQUEST:
      return { savingEmployeePassword: true };
    case employeeConstants.SAVE_EMPLOYEE_PASSWORD_SUCCESS:
      return {};
    case employeeConstants.SAVE_EMPLOYEE_PASSWORD_FAILURE:
      return { error: action.error };
    default:
      return state;
  }
}
