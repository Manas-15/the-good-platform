import { payrollConstants } from "../constants";

export function payrollSetting(state = {}, action) {
  switch (action.type) {
    case payrollConstants.GET_PAYROLL_SETTING_REQUEST:
      return {
        loading: true
      };
    case payrollConstants.GET_PAYROLL_SETTING_SUCCESS:
      return {
        items: action.preferences.data.preference
      };
    case payrollConstants.GET_PAYROLL_SETTING_FAILURE:
      return {
        error: action.error
      };
    case payrollConstants.GET_PAYROLL_SETTING_ACTION_REQUEST:
      return {
        ...state,
        items: state.items.map((item) => {
          if (item?.employeePreferenceId === action?.preference?.preferenceId) {
            return { ...item, isDeleted: true };
          }
          return item;
        })
      };
    case payrollConstants.PROCESS_BATCH_REQUEST:
      return {
        ...state,
        loading: true,
        data:
          action?.data?.batchType === "Direct"
            ? action?.data
            : action?.data?.items?.active,
        batchType: action?.data?.batchType,
        allRecords: action?.data?.allRecords
      };
    case payrollConstants.PROCESS_BATCH_SUCCESS:
      if (state?.batchType === "Direct") {
        const items = state?.allRecords?.filter?.((item) => {
          if (!state?.data?.ids?.includes?.(item?.Id)) {
            return item;
          }
          // return item;
        });
        return {
          // ...state,
          directPayments: items
        };
      } else {
        const activeItems = state?.items?.active?.map?.((item) => {
          // if (selectedItems?.includes(item?.employeePreferenceId)) {
          return {
            ...item,
            status: payrollConstants.PENDING_STATUS,
            batchId: action?.preferences?.data?.batchId
          };
          // }
          // return item;
        });
        return {
          // ...state,
          items: { active: activeItems, complete: state?.items?.complete }
        };
      }
    case payrollConstants.PROCESS_BATCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case payrollConstants.GET_BATCH_DETAILS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case payrollConstants.GET_BATCH_DETAILS_SUCCESS:
      return {
        items: action?.batches?.data?.batch_detail
      };
    case payrollConstants.GET_BATCH_DETAILS_FAILURE:
      return {
        error: action.error
      };
    default:
      return state;
  }
}
