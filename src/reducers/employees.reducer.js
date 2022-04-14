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
    default:
      return state;
  }
}
