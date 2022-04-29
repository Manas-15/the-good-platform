import { charityProgramConstants } from "./../constants";
import { charityProgramService } from "./../services";
import { alertActions } from "./";

export const charityProgramActions = {
  getCharityPrograms,
  saveDonationPreference,
};

function getCharityPrograms(data) {
  return (dispatch) => {
    dispatch(request());
    charityProgramService.getCharityPrograms(data).then(
      (charityPrograms) => dispatch(success(charityPrograms)),

      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: charityProgramConstants.GET_CHARITY_PROGRAMS_REQUEST };
  }
  function success(charityPrograms) {
    return {
      type: charityProgramConstants.GET_CHARITY_PROGRAMS_SUCCESS,
      charityPrograms,
    };
  }
  function failure(error) {
    return {
      type: charityProgramConstants.GET_CHARITY_PROGRAMS_FAILURE,
      error,
    };
  }
}
function saveDonationPreference(data) {
  return (dispatch) => {
    dispatch(request(data));
    charityProgramService.saveDonationPreference(data).then(
      (data) => {
        dispatch(success(data));
        dispatch(
          alertActions.success("Donation preferences saved successfully.")
        );
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(data) {
    return {
      type: charityProgramConstants.SAVE_DONATION_PREFERENCE_REQUEST,
      data,
    };
  }
  function success(preferences) {
    return {
      type: charityProgramConstants.SAVE_DONATION_PREFERENCE_SUCCESS,
      preferences,
    };
  }
  function failure(error) {
    return {
      type: charityProgramConstants.SAVE_DONATION_PREFERENCE_FAILURE,
      error,
    };
  }
}
