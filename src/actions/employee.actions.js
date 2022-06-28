import { employeeConstants, userConstants } from "../constants";
import { employeeService, userService } from "../services";
import { alertActions } from "./";
import { history } from "../helpers";
import { userActions } from "./user.actions";

export const employeeActions = {
  login,
  validateOtp,
  resendOtp,
  logout,
  register,
  getEmployees,
  setEmployeePassword,
  setPasswordValid,
  employeeAccountRequest,
  addEmployee,
  bulkImport,
  getCorporates,
};

function login(data, from) {
  if (data?.loginType === "Employee") {
    return (dispatch) => {
      dispatch(request({ data }));
      employeeService.login(data).then(
        (res) => {
          dispatch(success(res));
          console.log("res?.data?.approve 111", res?.data);
          if (data?.loginType === "Others") {
            const result = JSON.stringify(res?.data);
            localStorage.setItem("accessToken", result);
            dispatch(userActions.getDetail());
          } else {
            if (
              !res?.data?.status &&
              res?.data?.user_type === userConstants.INDIVIDUAL
            ) {
              dispatch(
                alertActions.error("Your account is currently blocked.")
              );
            } else {
              if (res?.data?.approve) {
                const result = JSON.stringify(res?.data);
                localStorage.setItem("user", JSON.stringify(res?.data));
                // history.push("/dashboard");
                // dispatch(alertActions.success("Loggedin successful"));
                // dispatch(userActions.loggedInUser(userConstants.EMPLOYEE));
                history.push("/otp");
              } else {
                // if(!res?.data?.approve) {
                //   dispatch(
                //     alertActions.error("Your account is currently blocked")
                //   );
                // } else {
                dispatch(alertActions.error(res?.data?.msg));
                // }
              }
              // dispatch(
              //   alertActions.error("Your account is currently inactive.")
              // );
            }
          }
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
  } else if (data?.loginType === "Individual") {
    return (dispatch) => {
      dispatch(request({ data }));
      employeeService.login(data).then(
        (data) => {
          dispatch(success(data));
          if (data?.data?.msg !== "Login Success") {
            dispatch(alertActions.error(data?.data?.msg));
          } else {
            const res = JSON.stringify(data?.data);
            localStorage.setItem("user", JSON.stringify(data?.data));
            // dispatch(userActions.loggedInUser(userConstants.INDIVIDUAL));

            history.push("/otp");
          }
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
      return { type: employeeConstants.INDIVIDUAL_LOGIN_REQUEST, data };
    }
    function success(data) {
      return { type: employeeConstants.INDIVIDUAL_LOGIN_SUCCESS, data };
    }
    function failure(error) {
      return { type: employeeConstants.INDIVIDUAL_LOGIN_FAILURE, error };
    }
  }
}
function validateOtp(data, from) {
  return (dispatch) => {
    dispatch(request({ data }));

    employeeService.validateOtp(data).then(
      (data) => {
        dispatch(success(data));
        if (data?.data?.msg === "Invalid OTP") {
          history.push("/otp");
          dispatch(alertActions.error(data?.data?.msg));
        } else {
          localStorage.setItem("otpVerified", true);

          console.log(">>>>>>>>>>>>>", data?.data?.user_type);
          if (data?.data?.user_type === userConstants.EMPLOYEE) {
            dispatch(userActions.loggedInUser(userConstants.EMPLOYEE));
          } else if (data?.data?.user_type === userConstants.INDIVIDUAL) {
            dispatch(userActions.loggedInUser(userConstants.INDIVIDUAL));
          }
          history.push("/");
        }
        // dispatch(alertActions.success("Loggedin successful"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        localStorage.removeItem("user");
        dispatch(
          alertActions.error(
            error?.response?.data?.errors?.detail
              ? error?.response?.data?.errors?.detail
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
  // userService.logout();
  localStorage.clear();
  return { type: userConstants.LOGOUT };
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
function register(employee, userType) {
  return (dispatch) => {
    dispatch(request(employee));

    employeeService.register(employee, userType).then(
      (data) => {
        dispatch(success());
        // console.log("ddddddddddddddddd data", data?.data?.email);
        if (data?.data?.email) {
          dispatch(alertActions.error(data?.data?.email[0]));
        } else {
          history.push({
            pathname: "/thank-you",
            state: { userType: userType },
          });
        }
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
        if (
          data?.data?.msg === employeeConstants.ALREADY_SET_PASSWORD_ERROR ||
          data?.data?.msg === employeeConstants.INVALID_SET_PASSWORD_ERROR
        ) {
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
        dispatch(
          alertActions.success("Password was set successfully. Please login.")
        );
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

function addEmployee(employee) {
  console.log(employee, "employee actionnnnnnnnnn");
  return (dispatch) => {
    dispatch(request(employee));
    employeeService.addEmployee(employee).then(
      (res) => {
        dispatch(success(res));
        if (res?.data?.email) {
          dispatch(alertActions.error(res?.data?.email?.[0]));
        } else {
          history.push(`/corporates/${employee.corporateProfileId}/employees`);
          dispatch(alertActions.success("Employee added successfully"));
        }
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
    console.log(employee, "after sucesssssssssss");
    return { type: employeeConstants.ADD_EMPLOYEE_SUCCESS, employee };
  }
  function failure(error) {
    return { type: employeeConstants.ADD_EMPLOYEE_FAILURE, error };
  }
}

function bulkImport(formData) {
  return (dispatch) => {
    dispatch(request(formData));
    employeeService.bulkImport(formData).then(
      () => {
        dispatch(success());
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(formData) {
    return {
      type: employeeConstants.BULK_IMPORT_REQUEST,
      formData,
    };
  }
  function success(formData) {
    return { type: employeeConstants.BULK_IMPORT_SUCCESS, formData };
  }
  function failure(error) {
    return { type: employeeConstants.BULK_IMPORT_FAILURE, error };
  }
}
function getCorporates() {
  return (dispatch) => {
    dispatch(request());
    employeeService.getCorporates().then(
      (res) => {
        dispatch(success(res));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return {
      type: employeeConstants.GET_CORPORATES_REQUEST,
    };
  }
  function success(data) {
    return { type: employeeConstants.GET_CORPORATES_SUCCESS, data };
  }
  function failure(error) {
    return { type: employeeConstants.GET_CORPORATES_FAILURE, error };
  }
}
