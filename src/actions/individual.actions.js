import { individualConstants } from "../constants";
import { individualService } from "../services";
import { alertActions } from "./";
import { history } from "../helpers";

export const individualActions = {
  getIndividuals,
  individualAccountRequest,
};

function getIndividuals() {
  return (dispatch) => {
    dispatch(request());

    individualService.getIndividuals().then(
      (individuals) => dispatch(success(individuals)),

      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: individualConstants.GET_INDIVIDUALS_REQUEST };
  }
  function success(individuals) {
    return { type: individualConstants.GET_INDIVIDUALS_SUCCESS, individuals };
  }
  function failure(error) {
    return { type: individualConstants.GET_INDIVIDUALS_FAILURE, error };
  }
}
function individualAccountRequest(actionValues) {
  return (dispatch) => {
    console.log(actionValues);
    dispatch(request(actionValues));
    individualService.individualAccountRequest(actionValues).then(
      (msg) => {
        dispatch(success(msg));
        dispatch(
          alertActions.success(
            `Individual user ${
              actionValues.requestType === "Block"
                ? "Blocked"
                : actionValues.requestType.toLowerCase() + "ed"
            } successfully`
          )
        );
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(individual) {
    return { type: individualConstants.INDIVIDUAL_ACTION_REQUEST, individual };
  }
  function success(data) {
    console.log(data);
    return { type: individualConstants.INDIVIDUAL_ACTION_SUCCESS, data };
  }
  function failure(error) {
    return { type: individualConstants.INDIVIDUAL_ACTION_FAILURE, error };
  }
}
