import { socialOrganizationConstants } from "../constants";

export function socialOrganizations(state = {}, action) {
  switch (action.type) {
    case socialOrganizationConstants.GET_SOCIAL_ORGANIZATIONS_REQUEST:
      return {
        loading: true,
        userType: action?.data?.loggedInUserType,
        individualId: action?.data?.individualId
      };
    case socialOrganizationConstants.GET_SOCIAL_ORGANIZATIONS_SUCCESS:
      if (state?.userType === 2 || state?.individualId !== "social") {
        return {
          items: action?.socialOrganizations?.data?.data?.data,
          totalCount: action?.socialOrganizations?.data?.data?.numberOfElements,
          loading: false
        };
      } else {
        return {
          items: action?.socialOrganizations?.data?.social_organization,
          totalCount: action?.socialOrganizations?.data?.totalCount,
          loading: false
        };
      }
    case socialOrganizationConstants.GET_SOCIAL_ORGANIZATIONS_FAILURE:
      return {
        error: action.error,
        loading: false
      };
    default:
      return state;
  }
}
