import { socialOrganizationConstants } from "../constants";

export function socialOrganizations(state = {}, action) {
  switch (action.type) {
    case socialOrganizationConstants.GET_SOCIAL_ORGANIZATIONS_REQUEST:
      return {
        loading: true,
      };
    case socialOrganizationConstants.GET_SOCIAL_ORGANIZATIONS_SUCCESS:
      return {
        items: action?.socialOrganizations?.data?.social_organization,
        totalCount: action?.socialOrganizations?.data?.count,
      };
    case socialOrganizationConstants.GET_SOCIAL_ORGANIZATIONS_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
}
