import { payrollConstants } from "../constants";

export function payrollBatch(state = {}, action) {
  switch (action.type) {
    case payrollConstants.GET_PAYROLL_BATCH_REQUEST:
      return {
        loading: true,
      };
    case payrollConstants.GET_PAYROLL_BATCH_SUCCESS:
      return {
        items: action?.batches?.data?.batch,
        totalCount: action?.batches?.data?.count,
        loading: false,
      };
    case payrollConstants.GET_PAYROLL_BATCH_FAILURE:
      return {
        error: action.error,
      };
    case payrollConstants.UPDATE_BATCH_STATUS_REQUEST:
      return {
        ...state,
        loading: true,
        batchId: action?.data?.batchId,
        requestType: action?.data?.requestType,
      };
    case payrollConstants.UPDATE_BATCH_STATUS_SUCCESS:
      console.log("dddddddddddddddddddd reducer", state?.requestType, state?.requestType)
      return {
        ...state,
        items: state.items.map((item) => {
          if (item?.batchId === state?.batchId) {
            if (
              state?.requestType === payrollConstants?.COMPLETE ||
              state?.requestType === payrollConstants?.UNCONFIRM
            ) {
              return {
                ...item,
                status: payrollConstants?.COMPLETED_STATUS,
              };
            }
            if (state?.requestType === payrollConstants?.CONFIRM) {
              return {
                ...item,
                status: payrollConstants?.CONFIRMED_STATUS,
              };
            }
            if (state?.requestType === payrollConstants?.PAID) {
              return {
                ...item,
                status: payrollConstants?.PAID_STATUS,
              };
            }
            if (state?.requestType === payrollConstants?.UNCONFIRM) {
              return {
                ...item,
                status: payrollConstants?.COMPLETED_STATUS,
              };
            }
            if (state?.requestType === payrollConstants?.RECEIVE) {
              return {
                ...item,
                status: payrollConstants?.RECEIVED_STATUS,
              };
            }
          }
          return item;
        }),
        loading: false,
        batchId: null,
        requestType: null,
      };
    case payrollConstants.UPDATE_BATCH_STATUS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}
