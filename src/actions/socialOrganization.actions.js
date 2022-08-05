import { socialOrganizationConstants } from "../constants";
import { socialOrganizationService } from "../services";
import { alertActions } from "./";

export const socialOrganizationActions = {
  getSocialOrganizations
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
      data
    };
  }
  function success(socialOrganizations) {
    return {
      type: socialOrganizationConstants.GET_SOCIAL_ORGANIZATIONS_SUCCESS,
      socialOrganizations
    };
  }
  function failure(error) {
    return {
      type: socialOrganizationConstants.GET_SOCIAL_ORGANIZATIONS_FAILURE,
      error
    };
  }
}
