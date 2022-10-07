import { charityProgramConstants } from "../constants";
import { charityProgramService } from "../services";
import { alertActions } from "./alert.actions";

export const selectedCharityActions = {
  selectedCharity,
  saveProgramPrice,
  fetchProgramPrice
};

function selectedCharity(view) {
  return { type: "GET_CHARITY", view };
}
function saveProgramPrice(data) {
  return (dispatch) => {
    dispatch(request(data));
    charityProgramService
      .saveProgramPrice(data)
      .then((res) => {
        dispatch(success(res));
        dispatch(alertActions.success("Program price saved successfully"));
      })
      .catch((error) => {
        dispatch(failure(error.toString()));
      });
  };

  function request(data) {
    return {
      type: charityProgramConstants.SAVE_PROGRAM_PRICE_REQUEST,
      data
    };
  }
  function success(data) {
    return {
      type: charityProgramConstants.SAVE_PROGRAM_PRICE_SUCCESS
    };
  }
  function failure(error) {
    return {
      type: charityProgramConstants.SAVE_PROGRAM_PRICE_FAILURE,
      error
    };
  }
}
function fetchProgramPrice(data) {
  return (dispatch) => {
    dispatch(request(data));
    charityProgramService
      .fetchProgramPrice(data)
      .then((res) => {
        dispatch(success(res));
      })
      .catch((error) => {
        dispatch(failure(error.toString()));
      });
  };

  function request(data) {
    return {
      type: charityProgramConstants.FETCH_PROGRAM_PRICE_REQUEST,
      data
    };
  }
  function success(data) {
    return {
      type: charityProgramConstants.FETCH_PROGRAM_PRICE_SUCCESS,
      data
    };
  }
  function failure(error) {
    return {
      type: charityProgramConstants.FETCH_PROGRAM_PRICE_FAILURE,
      error
    };
  }
}
