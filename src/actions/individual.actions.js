import { individualConstants } from "../constants";
import { individualService } from "../services";
import { alertActions } from "./";
import { history } from "../helpers";

export const individualActions = {
  getIndividuals,
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