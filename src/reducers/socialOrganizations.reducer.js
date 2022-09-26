import { socialOrganizationConstants, viewPortalConstants } from "../constants";

export function socialOrganizations(state = {}, action) {
  switch (action.type) {
    case socialOrganizationConstants.GET_SOCIAL_ORGANIZATIONS_REQUEST:
      console.log(action);
      return {
        loading: true,
        userType: action?.data?.loggedInUserType,
        userRole: action?.data?.userRole,
        individualId: action?.data?.individualId
      };
    case socialOrganizationConstants.GET_SOCIAL_ORGANIZATIONS_SUCCESS:
      console.log("11111", action?.socialOrganizations?.data);
      console.log("44444", state?.individualId);
      console.log("3333", viewPortalConstants.PAYMENT_ADMIN);
      console.log("555555", state?.userRole);
      if (
        (state?.userType === 2 || state?.userType === 3) &&
        state?.userRole !== viewPortalConstants.PAYMENT_ADMIN &&
        state?.individualId !== "social"
      ) {
        return {
          items: action?.socialOrganizations?.data?.social_organization,
          totalCount: action?.socialOrganizations?.data?.data?.numberOfElements,
          loading: false
        };
      } else {
        return {
          items: action?.socialOrganizations?.data?.data
            ? action?.socialOrganizations?.data?.data
            : action?.socialOrganizations?.data?.social_organization,
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
