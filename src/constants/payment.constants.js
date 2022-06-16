export const paymentConstants = {
  GET_ORDER_TOKEN_REQUEST: "GET_ORDER_TOKEN_REQUEST",
  GET_ORDER_TOKEN_SUCCESS: "GET_ORDER_TOKEN_SUCCESS",
  GET_ORDER_TOKEN_FAILURE: "GET_ORDER_TOKEN_FAILURE",

  GET_PAYMENT_STATUS_REQUEST: "GET_PAYMENT_STATUS_REQUEST",
  GET_PAYMENT_STATUS_SUCCESS: "GET_PAYMENT_STATUS_SUCCESS",
  GET_PAYMENT_STATUS_FAILURE: "GET_PAYMENT_STATUS_FAILURE",

  SAVE_PAYMENT_FAILURE_REQUEST: "SAVE_PAYMENT_FAILURE_REQUEST",
  SAVE_PAYMENT_FAILURE_SUCCESS: "SAVE_PAYMENT_FAILURE_SUCCESS",
  SAVE_PAYMENT_FAILURE_FAILURE: "SAVE_PAYMENT_FAILURE_FAILURE",

  PAID: "PAID",
  ERROR: "ERROR",

  SUCCESS: "SUCCESS",
  PENDING: "PENDING",
  FAILED: "FAILED",

  // payment_status
  PAYMENT_STATUS_INITITATED: 1,
  PAYMENT_STATUS_PENDING: 2,
  PAYMENT_STATUS_SUCCESS: 3,
  PAYMENT_STATUS_FAILURE: 4,

  // payment_method
  PAYMENT_METHOD_NETBANKING: 1,
  PAYMENT_METHOD_CARD: 2,
  PAYMENT_METHOD_UPI: 3,
  PAYMENT_METHOD_WALLET: 4,

  // payment_response
  PAYMENT_SUCCESS: 2,
  PAYMENT_FAILURE: 1,
  PAYMENT_PENDING: 3,

  // payment_response
  PAYMENT_NOT_PROCESSED: 1,
  PAYMENT_PROCESSED: 2,
};
