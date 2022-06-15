import { transactionsHistoryConstants } from "../constants";
import { transactionsHistoryService } from "../services";
import { alertActions } from "./";
import { history } from "../helpers";

export const transactionsHistoryActions = {
  getDirectPayment,
  getTransactionsHistory,
  download80G,
  send80GEmail
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
    return {
      type: transactionsHistoryConstants.GET_TRANSACTIONS_HISTORY_REQUEST
    };
  }
  function success(data) {
    return {
      type: transactionsHistoryConstants.GET_TRANSACTIONS_HISTORY_SUCCESS,
      data
    };
  }
  function failure(error) {
    return {
      type: transactionsHistoryConstants.GET_TRANSACTIONS_HISTORY_FAILURE,
      error
    };
  }
}
function getDirectPayment(data) {
  return (dispatch) => {
    dispatch(request(data));

    transactionsHistoryService.getDirectPayment(data).then(
      (transactions) => dispatch(success(transactions)),

      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return {
      type: transactionsHistoryConstants.GET_DIRECT_PAYMENT_REQUEST
    };
  }
  function success(data) {
    return {
      type: transactionsHistoryConstants.GET_DIRECT_PAYMENT_SUCCESS,
      data
    };
  }
  function failure(error) {
    return {
      type: transactionsHistoryConstants.GET_DIRECT_PAYMENT_FAILURE,
      error
    };
  }
}
function download80G(data) {
  return (dispatch) => {
    dispatch(request(data));

    transactionsHistoryService
      .download80G(data)
      .then(
        (data) => dispatch(success(data)),
        (error) => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      )
      .then((blob) => {
        // Create blob link to download
        const url = window.URL.createObjectURL(new Blob([blob?.data?.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `80G_Certificate_${data?.transactionId}.pdf`
        );
        // Append to html link element page
        document.body.appendChild(link);
        // Start download
        link.click();
        // Clean up and remove the link
        link.parentNode.removeChild(link);
        // dispatch(success(data))
      });
  };

  function request(data) {
    return { type: transactionsHistoryConstants.GET_80G_REQUEST, data };
  }
  function success(data) {
    return { type: transactionsHistoryConstants.GET_80G_SUCCESS, data };
  }
  function failure(error) {
    return { type: transactionsHistoryConstants.GET_80G_FAILURE, error };
  }
}
function send80GEmail(data) {
  return (dispatch) => {
    dispatch(request());
    transactionsHistoryService.send80GEmail(data).then(
      (data) => {
        dispatch(success());
        dispatch(alertActions.success("Mail sent successfully."));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return {
      type: transactionsHistoryConstants.SEND_80G_EMAIL_REQUEST
    };
  }
  function success() {
    return {
      type: transactionsHistoryConstants.SEND_80G_EMAIL_SUCCESS
    };
  }
  function failure(error) {
    return {
      type: transactionsHistoryConstants.SEND_80G_EMAIL_FAILURE,
      error
    };
  }
}
