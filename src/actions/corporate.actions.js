import { corporateConstants } from "../constants";
import { corporateService } from "../services";
import { alertActions } from "./";
import { history } from "../helpers";

export const corporateActions = {
  addCorporate,
  registerCorporate,
  getCorporates,
};

function getCorporates() {
  return (dispatch) => {
    dispatch(request());

    corporateService.getCorporates().then(
      (corporates) => dispatch(success(corporates)),
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: corporateConstants.GET_CORPORATES_REQUEST };
  }
  function success(corporates) {
    return { type: corporateConstants.GET_CORPORATES_SUCCESS, corporates };
  }
  function failure(error) {
    return { type: corporateConstants.GET_CORPORATES_FAILURE, error };
  }
}

function addCorporate(corporate) {
  return (dispatch) => {
    dispatch(request(corporate));

    corporateService.addCorporate(corporate).then(
      (corporate) => {
        dispatch(success(corporate));
        history.push("/corporates");
        dispatch(alertActions.success("Corporate added successfully"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(corporate) {
    return { type: corporateConstants.ADD_CORPORATE_REQUEST, corporate };
  }
  function success(corporate) {
    return { type: corporateConstants.ADD_CORPORATE_SUCCESS, corporate };
  }
  function failure(error) {
    return { type: corporateConstants.ADD_CORPORATE_FAILURE, error };
  }
}
function registerCorporate(corporate, type) {
  return (dispatch) => {
    dispatch(request(corporate));

    corporateService.registerCorporate(corporate).then(
      (corporate) => {
        dispatch(success(corporate));
        if (type === "admin") {
          history.push("/login");
        }
        dispatch(
          alertActions.success(
            type === "admin"
              ? "Corporate added successfully"
              : "Corporate registered successfully"
          )
        );
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(corporate) {
    return { type: corporateConstants.ADD_CORPORATE_REQUEST, corporate };
  }
  function success(corporate) {
    return { type: corporateConstants.ADD_CORPORATE_SUCCESS, corporate };
  }
  function failure(error) {
    return { type: corporateConstants.ADD_CORPORATE_FAILURE, error };
  }
}
