import { userConstants } from "../constants";
import { userService } from "../services";
import { history } from "../helpers";
import { alertActions } from "./";

export const userActions = {
  login,
  getDetail,
  loggedInUser,
};

function login(data, from) {
  return (dispatch) => {
    dispatch(request({ data }));
    userService.login(data).then(
      (res) => {
        dispatch(success(res));
        console.log(">>>>>>>>>>>>>>>>>>>", res?.data)
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
        console.log("ssssssssssssssss user", res)
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