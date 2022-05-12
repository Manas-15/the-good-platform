import { payrollConstants } from "../constants";

export function payrollSetting(state = {}, action) {
  switch (action.type) {
    case payrollConstants.GET_PAYROLL_SETTING_REQUEST:
      return {
        loading: true,
      };
    case payrollConstants.GET_PAYROLL_SETTING_SUCCESS:
      return {
        items: action.preferences.data.preference,
      };
    case payrollConstants.GET_PAYROLL_SETTING_FAILURE:
      return {
        error: action.error,
      };
    case payrollConstants.GET_PAYROLL_SETTING_ACTION_REQUEST:
      return {
        ...state,
        items: state.items.map((item) => {
          if (item?.employeePreferenceId === action?.preference?.preferenceId) {
            return { ...item, isDeleted: true };
          }
          return item;
        }),
      };
    case payrollConstants.PROCESS_BATCH_REQUEST:
      return {
        ...state,
        loading: true,
        data: action?.data?.items,
      };
    case payrollConstants.PROCESS_BATCH_SUCCESS:
      const selectedItems = state?.data?.map((p) => p.employeePreferenceId);
      const pendingItems = state.items.map((item) => {
        if (selectedItems.includes(item?.employeePreferenceId)) {
          return { ...item, status: payrollConstants.PENDING_STATUS };
        }
        return item;
      });
      return {
        // ...state,
        items: pendingItems,
      };
    case payrollConstants.PROCESS_BATCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case payrollConstants.GET_BATCH_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case payrollConstants.GET_BATCH_DETAILS_SUCCESS:
      console.log("ddddddddd reducer", action);
      console.log("ddddddddd reducer state", state);
      return {
        items: action?.batches?.data?.batch,
      };
    case payrollConstants.GET_BATCH_DETAILS_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
}
