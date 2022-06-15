import { transactionsHistoryConstants } from "../constants";

export function transactionsHistory(state = {}, action) {
  switch (action.type) {
    case transactionsHistoryConstants.GET_TRANSACTIONS_HISTORY_REQUEST:
      return {
        loading: true
      };
    case transactionsHistoryConstants.GET_TRANSACTIONS_HISTORY_SUCCESS:
      return {
        items: action?.data?.data?.transaction_history,
        totalCount: action?.data?.data?.count
      };
    case transactionsHistoryConstants.GET_TRANSACTIONS_HISTORY_FAILURE:
      return {
        error: action.error
      };
    case transactionsHistoryConstants.GET_80G_REQUEST:
      return {
        ...state,
        transaction: action?.data?.transaction,
        downloading: true
      };
    case transactionsHistoryConstants.GET_80G_SUCCESS:
      return {
        items: state.items
      };
    case transactionsHistoryConstants.GET_80G_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case transactionsHistoryConstants.GET_DIRECT_PAYMENT_REQUEST:
      return {
        loading: true
      };
    case transactionsHistoryConstants.GET_DIRECT_PAYMENT_SUCCESS:
      return {
        directPayments: action?.data?.data?.direct_payment
      };
    case transactionsHistoryConstants.GET_DIRECT_PAYMENT_FAILURE:
      return {
        error: action.error
      };
    default:
      return state;
  }
}
