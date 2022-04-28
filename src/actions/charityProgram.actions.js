import { charityProgramConstants } from "./../constants";
import { charityProgramService } from "./../services";
import { alertActions } from "./";

export const charityProgramActions = {
  getCharityPrograms,
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
    return { type: charityProgramConstants.GET_CHARITY_PROGRAMS_SUCCESS, charityPrograms };
  }
  function failure(error) {
    return { type: charityProgramConstants.GET_CHARITY_PROGRAMS_FAILURE, error };
  }
}