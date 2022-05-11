import { payrollConstants } from "../constants";

export function payrollBatch(state = {}, action) {
  switch (action.type) {
    case payrollConstants.GET_PAYROLL_BATCH_REQUEST:
      return {
        loading: true,
      };
    case payrollConstants.GET_PAYROLL_BATCH_SUCCESS:
      return {
        items: action.preferences.data.preference,
      };
    case payrollConstants.GET_PAYROLL_BATCH_FAILURE:
      return {
        error: action.error,
      };
    case payrollConstants.PAYROLL_BATCH_ACTION_REQUEST:
      return {
        ...state,
        loading: true,
        batchId: action?.data?.batchId,
      };
    case payrollConstants.PAYROLL_BATCH_ACTION_SUCCESS:
      return {
        ...state,
        items: state?.items?.map((batch) =>
          batch.batchId === state.batchId
            ? { ...batch, isCompleted: true }
            : batch
        ),
        loading: false,
      };
    case payrollConstants.PAYROLL_BATCH_ACTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}
