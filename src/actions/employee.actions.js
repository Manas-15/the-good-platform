import { employeeConstants } from "../constants";
import { employeeService } from "../services";
import { alertActions } from "./";
import { history } from "../helpers";

export const employeeActions = {
  login,
  validateOtp,
  resendOtp,
  logout,
  registerEmployee,
  getEmployees,
  setEmployeePassword,
  setPasswordValid,
  employeeAccountRequest,
};

function login(data, from) {
  return (dispatch) => {
    dispatch(request({ data }));
    employeeService.login(data).then(
      (data) => {
        dispatch(success(data));
        localStorage.setItem("user", JSON.stringify(data.data));
        // history.push("/dashboard");
        dispatch(alertActions.success("Loggedin successful"));
        history.push("/otp");
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(
          alertActions.error(
            error?.response?.data?.errors?.non_field_errors
              ? error?.response?.data?.errors?.non_field_errors[0]
              : error.toString()
          )
        );
      }
    );
  };
  function request(data) {
    return { type: employeeConstants.EMPLOYEE_LOGIN_REQUEST, data };
  }
  function success(data) {
    return { type: employeeConstants.EMPLOYEE_LOGIN_SUCCESS, data };
  }
  function failure(error) {
    return { type: employeeConstants.EMPLOYEE_LOGIN_FAILURE, error };
  }
}
function validateOtp(data, from) {
  return (dispatch) => {
    dispatch(request({ data }));

    employeeService.validateOtp(data).then(
      (data) => {
        dispatch(success(data));
        localStorage.setItem("otpVerified", true);
        // dispatch(alertActions.success("Loggedin successful"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(
          alertActions.error(
            error?.response?.data?.msg
              ? error?.response?.data?.msg
              : error.toString()
          )
        );
      }
    );
  };
  function request(data) {
    return { type: employeeConstants.VALIDATE_OTP_REQUEST, data };
  }
  function success(data) {
    return { type: employeeConstants.VALIDATE_OTP_SUCCESS, data };
  }
  function failure(error) {
    return { type: employeeConstants.VALIDATE_OTP_FAILURE, error };
  }
}
function resendOtp(data) {
  return (dispatch) => {
    dispatch(request({ data }));

    employeeService.resendOtp(data).then(
      (data) => {
        dispatch(success(data));
        dispatch(alertActions.success("Otp was successful resent."));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(
          alertActions.error(
            error.toString() === "Error: Request failed with status code 404"
              ? "Unable to send otp."
              : error.toString()
          )
        );
      }
    );
  };
  function request(data) {
    return { type: employeeConstants.RESEND_OTP_REQUEST, data };
  }
  function success(data) {
    return { type: employeeConstants.RESEND_OTP_SUCCESS, data };
  }
  function failure(error) {
    return { type: employeeConstants.RESEND_OTP_FAILURE, error };
  }
}
function logout() {
  employeeService.logout();
  return { type: employeeConstants.LOGOUT };
}
function getEmployees(data) {
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
function registerEmployee(employee, type) {
  return (dispatch) => {
    dispatch(request(employee));

    employeeService.registerEmployee(employee).then(
      (employee) => {
        dispatch(success());
        history.push("/thank-you");
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
function setPasswordValid(data) {
  return (dispatch) => {
    dispatch(request(data));

    employeeService.setPasswordValid(data).then(
      (data) => {
        dispatch(success());
        if (data?.data?.msg === employeeConstants.ALREADY_SET_PASSWORD_ERROR || data?.data?.msg === employeeConstants.INVALID_SET_PASSWORD_ERROR){
          history.push("/");
          dispatch(alertActions.error(data?.data?.msg));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(data) {
    return { type: employeeConstants.VALID_SET_PASSWORD_REQUEST, data };
  }
  function success() {
    return { type: employeeConstants.VALID_SET_PASSWORD_SUCCESS };
  }
  function failure(error) {
    return { type: employeeConstants.VALID_SET_PASSWORD_FAILURE, error };
  }
}
function setEmployeePassword(data) {
  return (dispatch) => {
    dispatch(request(data));

    employeeService.setEmployeePassword(data).then(
      (data) => {
        dispatch(success());
        history.push("/");
        dispatch(alertActions.success("Password was set successfully. Please login."));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(data) {
    return { type: employeeConstants.SAVE_EMPLOYEE_PASSWORD_REQUEST, data };
  }
  function success() {
    return { type: employeeConstants.SAVE_EMPLOYEE_PASSWORD_SUCCESS };
  }
  function failure(error) {
    return { type: employeeConstants.SAVE_EMPLOYEE_PASSWORD_FAILURE, error };
  }
}

function employeeAccountRequest(actionValues) {
  return (dispatch) => {
    dispatch(request(actionValues));

    employeeService.employeeAccountRequest(actionValues).then(
      (msg) => {
        dispatch(success(msg));
        dispatch(
          alertActions.success(
            `Employee ${
              actionValues.requestType === "Reject"
                ? "rejected"
                : actionValues.requestType.toLowerCase() + "d"
            } successfully`
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
    return { type: employeeConstants.EMPLOYEE_ACTION_REQUEST, employee };
  }
  function success() {
    return { type: employeeConstants.EMPLOYEE_ACTION_SUCCESS };
  }
  function failure(error) {
    return { type: employeeConstants.EMPLOYEE_ACTION_FAILURE, error };
  }
}