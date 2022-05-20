import { socialOrganizationConstants } from "../constants";
import { socialOrganizationService } from "../services";
import { alertActions } from "./";

export const socialOrganizationActions = {
  getSocialOrganizations,
};

function getSocialOrganizations(data) {
  return (dispatch) => {
    dispatch(request());

    socialOrganizationService.getSocialOrganizations(data).then(
      
      (socialOrganizations) => dispatch(success(socialOrganizations)),

      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: socialOrganizationConstants.GET_SOCIAL_ORGANIZATIONS_REQUEST };
  }
  function success(socialOrganizations) {
    return { type: socialOrganizationConstants.GET_SOCIAL_ORGANIZATIONS_SUCCESS, socialOrganizations };
  }
  function failure(error) {
    return { type: socialOrganizationConstants.GET_SOCIAL_ORGANIZATIONS_FAILURE, error };
  }
}