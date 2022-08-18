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
        individualId: action?.data?.individualId,
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
          loading: false,
        };
      } else {
        return {
          items: action?.socialOrganizations?.data?.data,
          totalCount: action?.socialOrganizations?.data?.totalCount,
          loading: false,
        };
      }
    case socialOrganizationConstants.GET_SOCIAL_ORGANIZATIONS_FAILURE:
      return {
        error: action.error,
        loading: false,
      };

    case socialOrganizationConstants.GET_ALL_NEW_PROGRAME_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case socialOrganizationConstants.GET_ALL_NEW_PROGRAME_SUCCESS:
      console.log(action);
      return {
        ...state,
        newprogram: action?.data?.data?.employee_program,
        loading: true,
      };
    case socialOrganizationConstants.GET_ALL_NEW_PROGRAME_FAILURE:
      return {
        loading: false,
      };

    case socialOrganizationConstants.PROGRAM_ACTION_REQUEST:
      console.log(action, state);
      return {
        ...state,
        actionRequest: true,
        newprogram: state?.newprogram,
        socialId: action?.data?.socialId,
        requestType: action?.data?.status,
      };
    case socialOrganizationConstants.PROGRAM_ACTION_SUCCESS:
      return {
        ...state,
        actionRequest: false,
        newprogram: state?.newprogram?.map((item) => {
          if (item.socialId === state.socialId) {
            return { ...item, approve: state.requestType === "Approve" };
          }
          return item;
        }),
      };
    case socialOrganizationConstants.PROGRAM_ACTION_FAILURE:
      return {
        ...state,
        actionRequest: false,
        items: state?.newprogram,
        error: action.error,
      };

    case socialOrganizationConstants.GET_APPROVED_PROGRAM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case socialOrganizationConstants.GET_APPROVED_PROGRAM_SUCCESS:
      console.log(action);
      return {
        ...state,
        loading: true,
        employeeprogram: action?.data?.data?.employee_program,
      };
    case socialOrganizationConstants.GET_APPROVED_PROGRAM_FAILURE:
      return {
        loading: false,
      };

    default:
      return state;
  }
}
