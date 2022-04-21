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
};

function login(data, from) {
  return (dispatch) => {
    dispatch(request({ data }));

    employeeService.login(data).then(
      (data) => {
        dispatch(success(data));
        localStorage.setItem("user", JSON.stringify(data.data));
        // history.push("/dashboard");
        history.push("/otp");
        dispatch(alertActions.success("Loggedin successful"));
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
        console.log("after validate success,", data)
        localStorage.setItem("otpVerified", true);
        // history.push("/dashboard");
        dispatch(alertActions.success("Loggedin successful"));
      },
      (error) => {
        console.log("after validate error,", error?.response?.data)
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
        history.push("/thank-you");
        // dispatch(
        //   alertActions.success(
        //     "Employee registered successfully"
        //   )
        // );
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
function setEmployeePassword(data) {
  return (dispatch) => {
    dispatch(request(data));

    employeeService.setEmployeePassword(data).then(
      (data) => {
        dispatch(success());
        history.push("/");
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
