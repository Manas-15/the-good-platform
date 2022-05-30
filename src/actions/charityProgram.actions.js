import { charityProgramConstants } from "./../constants";
import { charityProgramService } from "./../services";
import { alertActions } from "./";

export const charityProgramActions = {
  getCharityPrograms,
  saveDonationPreference,
  operateSponsorRequest,
  operateDenyRequest,
  checkBeforeUnpromote,
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
function operateSponsorRequest(actionValues) {
  return (dispatch) => {
    dispatch(request(actionValues));

    charityProgramService.operateSponsorRequest(actionValues).then(
      (data) => {
        dispatch(success());
        dispatch(alertActions.success("Promoted successfully."));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(program) {
    return {
      type: charityProgramConstants.OPERATE_SPONSOR_REQUEST,
      program,
    };
  }
  function success() {
    return { type: charityProgramConstants.OPERATE_SPONSOR_SUCCESS };
  }
  function failure(error) {
    return {
      type: charityProgramConstants.OPERATE_SPONSOR_FAILURE,
      error,
    };
  }
}
function operateDenyRequest(actionValues) {
  return (dispatch) => {
    dispatch(request(actionValues));

    charityProgramService.operateDenyRequest(actionValues).then(
      (data) => {
        dispatch(success());
        dispatch(alertActions.success("Unpromoted successfully."));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(program) {
    return {
      type: charityProgramConstants.OPERATE_DENY_REQUEST,
      program,
    };
  }
  function success() {
    return { type: charityProgramConstants.OPERATE_DENY_SUCCESS };
  }
  function failure(error) {
    return {
      type: charityProgramConstants.OPERATE_DENY_FAILURE,
      error,
    };
  }
}
function checkBeforeUnpromote(actionValues) {
  return (dispatch) => {
    dispatch(request(actionValues));

    charityProgramService.checkBeforeUnpromote(actionValues).then(
      (data) => {
        dispatch(success(data));
        // if(data?.data?.msg){
        //   dispatch(alertActions.error(data?.data?.msg));
        // }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(program) {
    return {
      type: charityProgramConstants.CHECK_BEFORE_UNPROMOTE_REQUEST,
      program,
    };
  }
  function success(data) {
    return { type: charityProgramConstants.CHECK_BEFORE_UNPROMOTE_SUCCESS, data };
  }
  function failure(error) {
    return {
      type: charityProgramConstants.CHECK_BEFORE_UNPROMOTE_FAILURE,
      error,
    };
  }
}
