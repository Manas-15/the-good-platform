import { paymentConstants } from "../constants";
import { paymentService } from "../services";
import { alertActions } from "./";
import { history } from "../helpers";

export const paymentActions = {
  getOrderToken,
};

function getOrderToken(data) {
  return (dispatch) => {
    dispatch(request());

    paymentService.getOrderToken(data).then(
      (result) => {
        dispatch(success(result));
        if(result?.data?.message){
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