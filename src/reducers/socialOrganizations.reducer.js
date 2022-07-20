import { socialOrganizationConstants } from "../constants";

export function socialOrganizations(state = {}, action) {
  switch (action.type) {
    case socialOrganizationConstants.GET_SOCIAL_ORGANIZATIONS_REQUEST:
      console.log(">>>>>>>> inside reducers request", state);

      return {
        loading: true,
        userType: action?.data?.loggedInUserType,
      };
    case socialOrganizationConstants.GET_SOCIAL_ORGANIZATIONS_SUCCESS:
      console.log(">>>>>>>> inside reducers success", state);
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

    case socialOrganizationConstants.GET_SOCIAL_ORGANIZATIONS_FAILURE:
      console.log(">>>>>>>> inside reducers failure", state);

      return {
        error: action.error,
      };
    default:
      return state;
  }
}
