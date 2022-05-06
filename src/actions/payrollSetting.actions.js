import { payrollConstants } from "./../constants";
import { donationPreferenceService } from "./../services";
import { alertActions } from "./";

export const payrollSettingActions = {
  getDonationPreferences,
  operateActionRequest,
};

function getDonationPreferences(data) {
  return (dispatch) => {
    dispatch(request());
    donationPreferenceService.getDonationPreferences(data).then(
      (preferences) => dispatch(success(preferences)),

      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
  function request(data) {
    return {
      type: payrollConstants.GET_PAYROLL_SETTING_REQUEST,
    };
  }
  function success(preferences) {
    return {
      type: payrollConstants.GET_PAYROLL_SETTING_SUCCESS,
      preferences,
    };
  }
  function failure(error) {
    return {
      type: payrollConstants.GET_PAYROLL_SETTING_FAILURE,
      error,
    };
  }
}

function operateActionRequest(actionValues) {
  return (dispatch) => {
    dispatch(request(actionValues));
  };

  function request(preference) {
    return {
      type: payrollConstants.GET_PAYROLL_SETTING_ACTION_REQUEST,
      preference,
    };
  }
}
