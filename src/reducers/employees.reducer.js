import { employeeConstants } from "../constants";

export function employees(state = {}, action) {
  switch (action.type) {
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
