import { transactionsHistoryConstants } from "../constants";

export function transactionsHistory(state = {}, action) {
  switch (action.type) {
    case transactionsHistoryConstants.GET_TRANSACTIONS_HISTORY_REQUEST:
      return {
        loading: true,
      };
    case transactionsHistoryConstants.GET_TRANSACTIONS_HISTORY_SUCCESS:
      return {
        items: action?.data?.data?.transaction_history,
      };
    case transactionsHistoryConstants.GET_TRANSACTIONS_HISTORY_FAILURE:
      return {
        error: action.error,
      };
    case transactionsHistoryConstants.GET_80G_REQUEST:
      return {
        downloading: true,
      };
    case transactionsHistoryConstants.GET_80G_SUCCESS:
      console.log("action?.data?.data download", action?.data?.data)
      return {
        items: action?.data?.data?.file,
      };
    case transactionsHistoryConstants.GET_80G_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
}
