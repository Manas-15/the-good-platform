import { corporateConstants } from "../constants";
import { corporateService } from "../services";
import { alertActions } from "./";
import { history } from "../helpers";
// import { handleInputChange } from "react-select/dist/declarations/src/utils";
// import { alert } from "../reducers/alert.reducer";

export const corporateActions = {
  addCorporate,
  deleteCorporate,
  updateCorporate,
  registerCorporate,
  getCorporates,
  // getCorporateById,
  corporateAccountRequest
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

// function getCorporateById(data) {
//   // console.log(data, "By idddddd");
//   return (dispatch) => {
//     dispatch(request());

//     corporateService.getCorporateById(data).then(
//       (data) => dispatch(success(data)),

//       (error) => {
//         dispatch(failure(error.toString()));
//         dispatch(alertActions.error(error.toString()));
//       }
//     );
//   };

//   function request() {
//     return { type: corporateConstants.GET_CORPORATES_REQUEST_BY_ID };
//   }
//   function success(data) {
//     // console.log(data, "success data");
//     return { type: corporateConstants.GET_CORPORATES_SUCCESS_BY_ID, data };
//   }
//   function failure(error) {
//     return { type: corporateConstants.GET_CORPORATES_FAILURE_BY_ID, error };
//   }
// }

function addCorporate(corporate, type) {
  // console.log(corporate, type, "corporate actions");
  return (dispatch) => {
    dispatch(request(corporate));

    corporateService.addCorporate(corporate).then(
      (res) => {
        dispatch(success(res));
        if (res?.data?.email) {
          dispatch(alertActions.error(res?.data?.email?.[0]));
        } else {
          history.push("/list-corporates");
          dispatch(alertActions.success("Corporate added successfully"));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        // dispatch(alertActions.error(error.toString()));
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

function updateCorporate(corporate) {
  return (dispatch) => {
    dispatch(request(corporate));

    corporateService.updateCorporate(corporate).then(
      (corporate) => {
        dispatch(success(corporate));
        history.push("/list-corporates");
        dispatch(alertActions.success("Corporate Updated Successfully"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
  function request(corporate) {
    return { type: corporateConstants.UPDATE_CORPORATE_REQUEST, corporate };
  }
  function success(corporate) {
    return {
      type: corporateConstants.UPDATE_CORPORATE_SUCCESS,
      corporate
    };
  }
  function failure(error) {
    return { type: corporateConstants.UPDATE_CORPORATE_FAILURE, error };
  }
}

function deleteCorporate(corporateId) {
  // console.log(corporateId, "delete idddddd");
  return (dispatch) => {
    dispatch(request(corporateId));

    corporateService.deleteCorporate(corporateId).then(
      (corporateId) => {
        dispatch(success(corporateId));
        dispatch(alertActions.success("Corporate deleted successfully"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(corporateId) {
    return { type: corporateConstants.DELETE_CORPORATE_REQUEST, corporateId };
  }
  function success(corporateId) {
    return { type: corporateConstants.DELETE_CORPORATE_SUCCESS, corporateId };
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
    console.log(actionValues, "actyon typeeeee");
    dispatch(request(actionValues));
    corporateService.corporateAccountRequest(actionValues).then(
      (msg) => {
        dispatch(success(msg));
        dispatch(
          alertActions.success(
            `Corporate ${
              actionValues.requestType === "Inactivate"
                ? "inactivated"
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
  function success(data) {
    return { type: corporateConstants.CORPORATE_ACTION_SUCCESS, data };
  }
  function failure(error) {
    return { type: corporateConstants.CORPORATE_ACTION_FAILURE, error };
  }
}
