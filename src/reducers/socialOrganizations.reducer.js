import { socialOrganizationConstants, viewPortalConstants } from "../constants";

export function socialOrganizations(state = {}, action) {
  switch (action.type) {
    case socialOrganizationConstants.GET_SOCIAL_ORGANIZATIONS_REQUEST:
      console.log(action);
      return {
        ...state,
        loading: true,
        userType: action?.data?.loggedInUserType,
        userRole: action?.data?.userRole,
        individualId: action?.data?.individualId
      };
    case socialOrganizationConstants.GET_SOCIAL_ORGANIZATIONS_SUCCESS:
      if (
        (state?.userType === 2 || state?.userType === 3) &&
        state?.userRole !== viewPortalConstants.PAYMENT_ADMIN &&
        state?.individualId !== "social"
      ) {
        return {
          ...state,
          items: action?.socialOrganizations?.data?.social_organization,
          totalCount: action?.socialOrganizations?.data?.data?.numberOfElements,
          loading: false
        };
      } else {
        return {
          items: action?.socialOrganizations?.data?.data,
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
