import { transactionsHistoryConstants } from "../constants";
import { transactionsHistoryService } from "../services";
import { alertActions } from "./";
import { history } from "../helpers";

export const transactionsHistoryActions = {
  getTransactionsHistory,
  download80G,
};

function getTransactionsHistory(data) {
  return (dispatch) => {
    dispatch(request(data));

    transactionsHistoryService.getTransactionsHistory(data).then(
      (transactions) => dispatch(success(transactions)),

      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: transactionsHistoryConstants.GET_TRANSACTIONS_HISTORY_REQUEST };
  }
  function success(data) {
    return { type: transactionsHistoryConstants.GET_TRANSACTIONS_HISTORY_SUCCESS, data };
  }
  function failure(error) {
    return { type: transactionsHistoryConstants.GET_TRANSACTIONS_HISTORY_FAILURE, error };
  }
}
function download80G(data) {
  return (dispatch) => {
    dispatch(request(data));

    transactionsHistoryService.download80G(data).then(
      (transactions) => dispatch(success()),

      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: transactionsHistoryConstants.GET_80G_REQUEST };
  }
  function success(data) {
    return { type: transactionsHistoryConstants.GET_80G_SUCCESS, data };
  }
  function failure(error) {
    return { type: transactionsHistoryConstants.GET_80G_FAILURE, error };
  }
}