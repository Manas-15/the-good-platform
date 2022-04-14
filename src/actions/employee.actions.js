import { employeeConstants } from "../constants";
import { employeeService } from "../services";
import { alertActions } from "./";
import { history } from "../helpers";

export const employeeActions = {
  registerEmployee,
  getEmployees,
};

function getEmployees() {
  return (dispatch) => {
    dispatch(request());

    employeeService.getEmployees().then(
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
function registerEmployee(employee, type) {
  return (dispatch) => {
    dispatch(request(employee));

    employeeService.registerEmployee(employee).then(
      (employee) => {
        dispatch(success());
        if (type === "corporate") {
          history.push("/employees");
        } else {
          history.push("/login");
        }
        dispatch(
          alertActions.success(
            type === "corporate"
              ? "Employee added successfully"
              : "Employee registered successfully"
          )
        );
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(employee) {
    return { type: employeeConstants.ADD_EMPLOYEE_REQUEST, employee };
  }
  function success(employee) {
    return { type: employeeConstants.ADD_EMPLOYEE_SUCCESS, employee };
  }
  function failure(error) {
    return { type: employeeConstants.ADD_EMPLOYEE_FAILURE, error };
  }
}
