import { transactionsHistoryConstants } from "../constants";
import { transactionsHistoryService } from "../services";
import { alertActions } from "./";
import { history } from "../helpers";

export const transactionsHistoryActions = {
  getTransactionsHistory,
};

function getTransactionsHistory() {
  return (dispatch) => {
    dispatch(request());

    transactionsHistoryService.getTransactionsHistory().then(
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