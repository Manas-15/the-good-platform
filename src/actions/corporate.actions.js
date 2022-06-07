import { corporateConstants } from "../constants";
import { corporateService } from "../services";
import { alertActions } from "./";
import { history } from "../helpers";
import { alert } from "../reducers/alert.reducer";

export const corporateActions = {
  addCorporate,
  deleteCorporate,
  registerCorporate,
  getCorporates,
  getCorporateById,
  corporateAccountRequest,
};

function getCorporates() {
  return (dispatch) => {
    dispatch(request());

    corporateService.getCorporates().then(
      (corporates) => dispatch(success(corporates)),

      (error) => {
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

function getCorporateById(data) {
  console.log(data, "By idddddd");
  return (dispatch) => {
    dispatch(request());

    corporateService.getCorporateById(data).then(
      (data) => dispatch(success(data)),

      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: corporateConstants.GET_CORPORATES_REQUEST_BY_ID };
  }
  function success(data) {
    console.log(data, "success data");
    return { type: corporateConstants.GET_CORPORATES_SUCCESS_BY_ID, data };
  }
  function failure(error) {
    return { type: corporateConstants.GET_CORPORATES_FAILURE_BY_ID, error };
  }
}

function addCorporate(corporate, type) {
  console.log(corporate, type, "corporate actions");
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

function deleteCorporate(data) {
  console.log(data, "delete idddddd");
  return (dispatch) => {
    dispatch(request(data));

    corporateService.deleteCorporate(data).then(
      (data) => {
        dispatch(success(data));
        history.pusg("/list-corporates");
        dispatch(alertActions.success("Corporate deleted successfully"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(data) {
    return { type: corporateConstants.DELETE_CORPORATE_REQUEST, data };
  }
  function success(data) {
    return { type: corporateConstants.DELETE_CORPORATE_SUCCESS, data };
  }
  function failure(error) {
    return { type: corporateConstants.DELETE_CORPORATE_FAILURE, error };
  }
}
function registerCorporate(corporate, type) {
  return (dispatch) => {
    dispatch(request(corporate));

    corporateService.registerCorporate(corporate).then(
      (corporate) => {
        dispatch(success());
        if (type === "admin") {
          history.push("/corporates");
        } else {
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
function corporateAccountRequest(actionValues) {
  return (dispatch) => {
    dispatch(request(actionValues));

    corporateService.corporateAccountRequest(actionValues).then(
      (msg) => {
        dispatch(success(msg));
        dispatch(
          alertActions.success(
            `Corporate ${
              actionValues.requestType === "Reject"
                ? "rejected"
                : actionValues.requestType.toLowerCase() + "d"
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

  function request(corporate) {
    return { type: corporateConstants.CORPORATE_ACTION_REQUEST, corporate };
  }
  function success() {
    return { type: corporateConstants.CORPORATE_ACTION_SUCCESS };
  }
  function failure(error) {
    return { type: corporateConstants.CORPORATE_ACTION_FAILURE, error };
  }
}
