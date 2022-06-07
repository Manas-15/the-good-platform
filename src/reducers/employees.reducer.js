import { employeeConstants } from "../constants";
let user = JSON.parse(localStorage.getItem("user"));
const initialState = user ? { loggedIn: true, user } : {};
export function employee(state = initialState, action) {
  switch (action.type) {
    case employeeConstants.EMPLOYEE_LOGIN_REQUEST:
      return {
        loggingIn: true,
      };
    case employeeConstants.EMPLOYEE_LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action?.data?.data,
        otpVerified: false,
      };
    case employeeConstants.EMPLOYEE_LOGIN_FAILURE:
      return { loggingIn: false };
    case employeeConstants.INDIVIDUAL_LOGIN_REQUEST:
      return {
        loggingIn: true,
      };
    case employeeConstants.INDIVIDUAL_LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action?.data?.data,
        otpVerified: false,
      };
    case employeeConstants.INDIVIDUAL_LOGIN_FAILURE:
      return { loggingIn: false };
    case employeeConstants.VALIDATE_OTP_REQUEST:
      return {
        validitingOtp: true,
        user: state.user,
      };
    case employeeConstants.VALIDATE_OTP_SUCCESS:
      return {
        user: state.user,
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
        user: state.user,
      };
    case employeeConstants.GET_EMPLOYEES_SUCCESS:
      return {
        user: state.user,
        items: action?.employees?.data?.employee,
        totalCount: action?.employees?.data?.count,
      };
    case employeeConstants.GET_EMPLOYEES_FAILURE:
      return {
        user: state.user,
        error: action.error,
      };
    case employeeConstants.ADD_EMPLOYEE_REQUEST:
      return { addinguser: true };
    case employeeConstants.ADD_EMPLOYEE_SUCCESS:
      return {};
    case employeeConstants.ADD_EMPLOYEE_FAILURE:
      console.log("eeeeeeeeeeeeeeee error")
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
    case employeeConstants.VALID_SET_PASSWORD_REQUEST:
      return { validitingSetPassword: true };
    case employeeConstants.VALID_SET_PASSWORD_SUCCESS:
      return { validSetPassword: true };
    case employeeConstants.VALID_SET_PASSWORD_FAILURE:
      return { error: action.error };
    case employeeConstants.SAVE_EMPLOYEE_PASSWORD_REQUEST:
      return { savingEmployeePassword: true };
    case employeeConstants.SAVE_EMPLOYEE_PASSWORD_SUCCESS:
      return {};
    case employeeConstants.SAVE_EMPLOYEE_PASSWORD_FAILURE:
      return { error: action.error };
    case employeeConstants.EMPLOYEE_ACTION_REQUEST:
      return {
        ...state,
        items: state.items,
        actionRequest: true,
        employeeId: action?.employee?.userId,
        requestType: action?.employee?.requestType,
      };
    case employeeConstants.EMPLOYEE_ACTION_SUCCESS:
      return {
        ...state,
        actionRequest: false,
        items: state.items.map((item) => {
          if (item.id === state.employeeId) {
            return { ...item, isApprove: state.requestType === "Approve" };
          }
          return item;
        }),
      };
    case employeeConstants.EMPLOYEE_ACTION_FAILURE:
      return {
        ...state,
        actionRequest: false,
        items: state.items,
        error: action.error,
      };
    case employeeConstants.BULK_IMPORT_REQUEST:
      return { ...state, loading: true };
    case employeeConstants.BULK_IMPORT_SUCCESS:
      return { ...state, items: action?.data?.data?.employee };
    case employeeConstants.BULK_IMPORT_FAILURE:
      return { ...state, error: action.error };
    default:
      return state;
  }
}
