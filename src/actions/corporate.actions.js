import { corporateConstants } from "../constants";
import { corporateService } from "../services";
import { alertActions } from "./";
import { history } from "../helpers";

export const corporateActions = {
  addCorporate,
  registerCorporate,
  getCorporates,
  approveCorporate,
  rejectCorporate,
};

function getCorporates() {
  return (dispatch) => {
    dispatch(request());

    corporateService.getCorporates().then(
      (corporates) => dispatch(success(corporates)),

      (error) => {
        console.log("errorerrorerror", error);
        dispatch(failure(error.toString()));
        dispatch(
          alertActions.error(error.toString())
          // alertActions.error(
          //   error.toString() === "Error: Request failed with status code 401"
          //     ? "Token is invalid or expired"
          //     : error.toString()
          // )
        );
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
function approveCorporate(corporate, type) {
  return (dispatch) => {
    dispatch(request(corporate));

    corporateService.approveCorporate(corporate).then(
      (corporate) => {
        dispatch(success(corporate));
        history.push("/corporates");
        dispatch(alertActions.success("Corporate approved successfully"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(corporate) {
    return { type: corporateConstants.APPROVE_CORPORATE_REQUEST, corporate };
  }
  function success(corporate) {
    return { type: corporateConstants.APPROVE_CORPORATE_SUCCESS, corporate };
  }
  function failure(error) {
    return { type: corporateConstants.APPROVE_CORPORATE_FAILURE, error };
  }
}
function rejectCorporate(corporate, type) {
  return (dispatch) => {
    dispatch(request(corporate));

    corporateService.rejectCorporate(corporate).then(
      (corporate) => {
        dispatch(success(corporate));
        history.push("/corporates");
        dispatch(alertActions.success("Corporate rejected successfully"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(corporate) {
    return { type: corporateConstants.REJECT_CORPORATE_REQUEST, corporate };
  }
  function success(corporate) {
    return { type: corporateConstants.REJECT_CORPORATE_SUCCESS, corporate };
  }
  function failure(error) {
    return { type: corporateConstants.REJECT_CORPORATE_FAILURE, error };
  }
}
