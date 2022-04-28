import { transactionsHistoryConstants } from "../constants";

export function transactionsHistory(state = {}, action) {
  switch (action.type) {
    case transactionsHistoryConstants.GET_TRANSACTIONS_HISTORY_REQUEST:
      return {
        loading: true,
      };
    case transactionsHistoryConstants.GET_TRANSACTIONS_HISTORY_SUCCESS:
      console.log("dddddddddddddddddd transactions history", action?.data)
      return {
        items: action?.data?.data?.corporates,
      };
    case transactionsHistoryConstants.GET_TRANSACTIONS_HISTORY_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
}
