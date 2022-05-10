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
        loading: true,
      };
    case payrollConstants.PROCESS_BATCH_SUCCESS:
      return {
        items: action?.data?.data,
      };
    case payrollConstants.PROCESS_BATCH_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
}
