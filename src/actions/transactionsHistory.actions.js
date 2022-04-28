import { employeeConstants } from "../constants";
import { employeeService } from "../services";
import { alertActions } from "./";
import { history } from "../helpers";

export const transactionsHistoryActions = {
  getTransactionsHistory,
};

function getTransactionsHistory(data) {
  return (dispatch) => {
    dispatch(request());

    employeeService.getEmployees(data).then(
      (employees) => dispatch(success(employees)),

      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: employeeConstants.GET_EMPLOYEES_REQUEST };
  }
  function success(employees) {
    return { type: employeeConstants.GET_EMPLOYEES_SUCCESS, employees };
  }
  function failure(error) {
    return { type: employeeConstants.GET_EMPLOYEES_FAILURE, error };
  }
}