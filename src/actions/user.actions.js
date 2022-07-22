import { userConstants } from "../constants";
import { userService } from "../services";
import { history } from "../helpers";
import { alertActions } from "./";
export const userActions = {
  login,
  getDetail,
  loggedInUser,
  logout,
  registerIndividual
};
function login(data, from) {
  return (dispatch) => {
    dispatch(request({ data }));
    userService.login(data).then(
      (res) => {
        dispatch(success(res));
        const result = JSON.stringify(res?.data?.accessToken);
        localStorage.setItem("accessToken", result);
        dispatch(userActions.getDetail());
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
    return { type: userConstants.USER_LOGIN_REQUEST, data };
  }
  function success(data) {
    return { type: userConstants.USER_LOGIN_SUCCESS, data };
  }
  function failure(error) {
    return { type: userConstants.USER_LOGIN_FAILURE, error };
  }
}
function getDetail() {
  return (dispatch) => {
    dispatch(request());
    userService.getDetail().then(
      (res) => {
        dispatch(success(res));
        console.log("res?.data?.data", res?.data?.data);
        localStorage.setItem("user", JSON.stringify(res?.data?.data));
        dispatch(loggedInUser(userConstants.CORPORATE));
        history.push("/dashboard");
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
  function request() {
    return { type: userConstants.USER_DETAIL_REQUEST };
  }
  function success(data) {
    return { type: userConstants.USER_DETAIL_SUCCESS, data };
  }
  function failure(error) {
    return { type: userConstants.USER_DETAIL_FAILURE, error };
  }
}
function loggedInUser(view) {
  return { type: "LOGGED_IN_USER_TYPE", view };
}
function logout(view) {
  return { type: "LOGOUT" };
}
function registerIndividual(individual) {
  return (dispatch) => {
    dispatch(request(individual));

    userService.registerIndividual(individual).then(
      (res) => {
        dispatch(success());
        history.push("/thank-you");
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
  function request(individual) {
    return { type: userConstants.REGISTER_INDIVIDUAL_REQUEST, individual };
  }
  function success(individual) {
    return { type: userConstants.REGISTER_INDIVIDUAL_SUCCESS, individual };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_INDIVIDUAL_FAILURE, error };
  }
}
