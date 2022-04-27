import { paymentConstants } from "../constants";

export function payment(state = {}, action) {
  switch (action.type) {
    case paymentConstants.GET_ORDER_TOKEN_REQUEST:
      return {
        loading: true,
      };
    case paymentConstants.GET_ORDER_TOKEN_SUCCESS:
      console.log("action.payment", action)
      return {
        orderDetails: action.data?.data,
      };
    case paymentConstants.GET_ORDER_TOKEN_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
}
