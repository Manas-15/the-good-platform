import { paymentConstants } from "../constants";
import { paymentService } from "../services";
import { alertActions } from "./";
import { history } from "../helpers";

export const paymentActions = {
  getOrderToken,
  getPaymentStatus,
  savePaymentFailureData,
};

function getOrderToken(data) {
  return (dispatch) => {
    dispatch(request());

    paymentService.getOrderToken(data).then(
      (result) => {
        dispatch(success(result));
        if (result?.data?.message) {
          dispatch(alertActions.error(result?.data?.message));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(
          alertActions.error(error.toString())
          // alertActions.error(
          //   error.toString() === "Error: Request failed with status code 401"
          //     ? "Token is invalid or expired"
          //     : error.toString()
          // )
        );
      }
    );
  };

  function request() {
    return { type: paymentConstants.GET_ORDER_TOKEN_REQUEST };
  }
  function success(data) {
    return { type: paymentConstants.GET_ORDER_TOKEN_SUCCESS, data };
  }
  function failure(error) {
    return { type: paymentConstants.GET_ORDER_TOKEN_FAILURE, error };
  }
}

function getPaymentStatus(data) {
  return (dispatch) => {
    dispatch(request());

    paymentService.getPaymentStatus(data).then(
      (response) => {
        dispatch(success(response));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: paymentConstants.GET_PAYMENT_STATUS_REQUEST };
  }
  function success(data) {
    return { type: paymentConstants.GET_PAYMENT_STATUS_SUCCESS, data };
  }
  function failure(error) {
    return { type: paymentConstants.GET_PAYMENT_STATUS_FAILURE, error };
  }
}

function savePaymentFailureData(data) {
  return (dispatch) => {
    dispatch(request(data));

    paymentService.savePaymentFailureData(data).then(
      (result) => {
        dispatch(success());
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: paymentConstants.SAVE_PAYMENT_FAILURE_REQUEST };
  }
  function success(data) {
    return { type: paymentConstants.SAVE_PAYMENT_FAILURE_SUCCESS, data };
  }
  function failure(error) {
    return { type: paymentConstants.SAVE_PAYMENT_FAILURE_FAILURE, error };
  }
}
