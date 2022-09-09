import { employeeProgramConstants } from "../constants";
import { employeeProgramService } from "../services";

export const employeeProgramActions = {
  getApprovedProgram
};
function getApprovedProgram(data) {
  return (dispatch) => {
    dispatch(request(data));

    employeeProgramService
      .getApprovedProgram(data)
      .then((res) => {
        dispatch(success(res));
        // dispatch(alertActions.success(""))
      })
      .catch((error) => {
        dispatch(failure(error.toString()));
      });
  };

  function request(data) {
    return {
      type: employeeProgramConstants.GET_APPROVED_PROGRAM_REQUEST,
      data
    };
  }
  function success(data) {
    return {
      type: employeeProgramConstants.GET_APPROVED_PROGRAM_SUCCESS,
      data
    };
  }
  function failure(error) {
    return {
      type: employeeProgramConstants.GET_APPROVED_PROGRAM_FAILURE,
      error
    };
  }
}
