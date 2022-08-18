import { socialOrganizationConstants } from "../constants";
import { socialOrganizationService } from "../services";
import { alertActions } from "./";

export const socialOrganizationActions = {
  getSocialOrganizations,
  addNewProgramme,
  getAllProgram,
  programActionRequest,
  getApprovedProgram,
};

function getSocialOrganizations(data) {
  return (dispatch) => {
    dispatch(request(data));

    socialOrganizationService.getSocialOrganizations(data).then(
      (socialOrganizations) => {
        if (socialOrganizations?.data?.msg) {
          dispatch(alertActions.error(socialOrganizations?.data?.msg));
        } else {
          dispatch(success(socialOrganizations));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(data) {
    return {
      type: socialOrganizationConstants.GET_SOCIAL_ORGANIZATIONS_REQUEST,
      data,
    };
  }
  function success(socialOrganizations) {
    return {
      type: socialOrganizationConstants.GET_SOCIAL_ORGANIZATIONS_SUCCESS,
      socialOrganizations,
    };
  }
  function failure(error) {
    return {
      type: socialOrganizationConstants.GET_SOCIAL_ORGANIZATIONS_FAILURE,
      error,
    };
  }
}

function addNewProgramme(data) {
  return (dispatch) => {
    dispatch(request(data));

    socialOrganizationService
      .addNewProgramme(data)
      .then((data) => {
        console.log(data);
        dispatch(success(data));
        dispatch(alertActions.success("New Program added successfully"));
      })
      .catch((error) => {
        console.log(error);
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      });
  };

  function request(data) {
    return {
      type: socialOrganizationConstants.ADD_NEW_PROGRAMME_REQUEST,
      data,
    };
  }
  function success(data) {
    return {
      type: socialOrganizationConstants.ADD_NEW_PROGRAMME_SUCCESS,
      data,
    };
  }
  function failure(error) {
    return {
      type: socialOrganizationConstants.ADD_NEW_PROGRAMME_FAILURE,
      error,
    };
  }
}

function getAllProgram(data) {
  return (dispatch) => {
    dispatch(request(data));

    socialOrganizationService
      .getAllProgram(data)
      .then((res) => {
        dispatch(success(res));
      })
      .catch((error) => {
        dispatch(failure(error));
      });
  };

  function request(data) {
    return {
      type: socialOrganizationConstants.GET_ALL_NEW_PROGRAME_REQUEST,
      data,
    };
  }
  function success(data) {
    return {
      type: socialOrganizationConstants.GET_ALL_NEW_PROGRAME_SUCCESS,
      data,
    };
  }
  function failure(error) {
    return {
      type: socialOrganizationConstants.GET_ALL_NEW_PROGRAME_FAILURE,
      error,
    };
  }
}

function programActionRequest(data) {
  return (dispatch) => {
    dispatch(request(data));

    socialOrganizationService
      .programActionRequest(data)
      .then((res) => {
        dispatch(success(res));
        dispatch(
          alertActions.success(
            `Program ${
              data.status === "Disapprove"
                ? "rejected"
                : data?.status?.toLowerCase() + "d"
            } successfully`
          )
        );
      })
      .catch((error) => {
        console.log(error);
        dispatch(failure(error));
      });
  };

  function request(data) {
    return { type: socialOrganizationConstants.PROGRAM_ACTION_REQUEST, data };
  }
  function success(data) {
    return { type: socialOrganizationConstants.PROGRAM_ACTION_SUCCESS, data };
  }
  function failure(error) {
    return { type: socialOrganizationConstants.PROGRAM_ACTION_FAILURE, error };
  }
}

function getApprovedProgram(data) {
  return (dispatch) => {
    dispatch(request(data));

    socialOrganizationService
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
      type: socialOrganizationConstants.GET_APPROVED_PROGRAM_REQUEST,
      data,
    };
  }
  function success(data) {
    return {
      type: socialOrganizationConstants.GET_APPROVED_PROGRAM_SUCCESS,
      data,
    };
  }
  function failure(error) {
    return {
      type: socialOrganizationConstants.GET_APPROVED_PROGRAM_FAILURE,
      error,
    };
  }
}
