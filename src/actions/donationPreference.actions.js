import { donationPreferenceConstants } from "./../constants";
import { donationPreferenceService } from "./../services";
import { alertActions } from "./";

export const donationPreferenceActions = {
  getDonationPreferences,
  saveDonationPreference,
  updateDonationPreference,  
};

function saveDonationPreference(data) {
  return (dispatch) => {
    dispatch(request());
    donationPreferenceService.saveDonationPreference(data).then(
      (data) => {
        console.log("success saved donation preference")
        dispatch(success());
        dispatch(alertActions.success("Donation preferences saved successfully."));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return {
      type: donationPreferenceConstants.SAVE_DONATION_PREFERENCE_REQUEST,
    };
  }
  function success(preferences) {
    return {
      type: donationPreferenceConstants.SAVE_DONATION_PREFERENCE_SUCCESS,
      preferences,
    };
  }
  function failure(error) {
    return {
      type: donationPreferenceConstants.SAVE_DONATION_PREFERENCE_FAILURE,
      error,
    };
  }
}
function updateDonationPreference(data) {
  return (dispatch) => {
    dispatch(request());
    donationPreferenceService.updateDonationPreference(data).then(
      (data) => {
        dispatch(success());
        dispatch(alertActions.success("Donation preference updated successfully."));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return {
      type: donationPreferenceConstants.UPDATE_DONATION_PREFERENCE_REQUEST,
    };
  }
  function success() {
    return {
      type: donationPreferenceConstants.UPDATE_DONATION_PREFERENCE_SUCCESS,
    };
  }
  function failure(error) {
    return {
      type: donationPreferenceConstants.UPDATE_DONATION_PREFERENCE_FAILURE,
      error,
    };
  }
}
function getDonationPreferences() {
  return (dispatch) => {
    dispatch(request());
    donationPreferenceService.getDonationPreferences().then(
      (preferences) => dispatch(success(preferences)),

      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
  function request() {
    return {
      type: donationPreferenceConstants.GET_DONATION_PREFERENCES_REQUEST,
    };
  }
  function success(preferences) {
    return {
      type: donationPreferenceConstants.GET_DONATION_PREFERENCES_SUCCESS,
      preferences,
    };
  }
  function failure(error) {
    return {
      type: donationPreferenceConstants.GET_DONATION_PREFERENCES_FAILURE,
      error,
    };
  }
}
