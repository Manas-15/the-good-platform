import { paymentConstants } from "../constants";

export function payment(state = {}, action) {
  switch (action.type) {
    case paymentConstants.GET_ORDER_TOKEN_REQUEST:
      return {
        loading: true,
      };
    case paymentConstants.GET_ORDER_TOKEN_SUCCESS:
      return {
        orderDetails: action.data?.data,
      };
    case paymentConstants.GET_ORDER_TOKEN_FAILURE:
      return {
        error: action.error,
      };
    case paymentConstants.GET_PAYMENT_STATUS_REQUEST:
      return {
        ...state,
        paymentStatusloading: true,
      };
    case paymentConstants.GET_PAYMENT_STATUS_SUCCESS:
      return {
        ...state,
        paymentStatusloading: false,
        paymentStatus: action.data?.data,
      };
    case paymentConstants.GET_PAYMENT_STATUS_FAILURE:
      return {
        ...state,
        paymentStatusloading: false,
        error: action.error,
      };
    default:
      return state;
  }
}
