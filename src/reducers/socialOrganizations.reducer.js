import { socialOrganizationConstants } from "../constants";

export function socialOrganizations(state = {}, action) {
  switch (action.type) {
    case socialOrganizationConstants.GET_SOCIAL_ORGANIZATIONS_REQUEST:
      return {
        loading: true,
        userType: action?.data?.loggedInUserType,
      };
    case socialOrganizationConstants.GET_SOCIAL_ORGANIZATIONS_SUCCESS:
      console.log(">>>>>>>> inside reducers", state);
      if (state?.userType === 2) {
        return {
          items: action?.socialOrganizations?.data?.data?.data,
          totalCount: action?.socialOrganizations?.data?.data?.numberOfElements,
        };
      } else {
        return {
          items: action?.socialOrganizations?.data?.social_organization,
          totalCount: action?.socialOrganizations?.data?.totalCount,
        };
      }

    //corporate portal
    //  return {
    //
    //
    //  };
    case socialOrganizationConstants.GET_SOCIAL_ORGANIZATIONS_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
}
