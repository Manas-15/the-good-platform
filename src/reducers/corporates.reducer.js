import { corporateConstants } from "../constants";

export function corporates(state = {}, action) {
  switch (action.type) {
    case corporateConstants.GET_CORPORATES_REQUEST:
      return {
        loading: true
      };
    case corporateConstants.GET_CORPORATES_SUCCESS:
      console.log(
        ">>>>>>>>> action?.corporates?.data",
        action?.corporates?.data?.corporates
      );
      return {
        items: action?.corporates?.data?.data?.data
      };
    case corporateConstants.GET_CORPORATES_FAILURE:
      return {
        error: action.error
      };
    case corporateConstants.GET_CORPORATES_REQUEST_BY_ID:
      return {
        loading: true
      };
    case corporateConstants.GET_CORPORATES_SUCCESS_BY_ID:
      return {
        items: action.corporates?.data?.corporates
      };
    case corporateConstants.GET_CORPORATES_FAILURE_BY_ID:
      return {
        error: action.error
      };

    case corporateConstants.ADD_CORPORATE_REQUEST:
      return { ...state, addingCorporate: true };
    case corporateConstants.ADD_CORPORATE_SUCCESS:
      return { ...state, addingCorporate: false };
    case corporateConstants.ADD_CORPORATE_FAILURE:
      return { ...state, addingCorporate: false };
    case corporateConstants.UPDATE_CORPORATE_REQUEST:
      return { updateCorporate: true };
    case corporateConstants.UPDATE_CORPORATE_SUCCESS:
      return { items: action.corporates?.data?.corporates };
    case corporateConstants.UPDATE_CORPORATE_FAILURE:
      return {};
    case corporateConstants.DELETE_CORPORATE_REQUEST:
      return {
        ...state,
        deleteCorporate: true,
        corporateId: action?.corporateId?.corporateId
      };
    case corporateConstants.DELETE_CORPORATE_SUCCESS:
      return {
        items: state?.items?.map((item) => {
          if (item.corporateId === state.corporateId) {
            item.isActive = false;
          }
          return item;
        }),
        response: action.corporateId?.data?.msg
      };
    case corporateConstants.DELETE_CORPORATE_FAILURE:
      return {};
    case corporateConstants.CORPORATE_ACTION_REQUEST:
      return {
        items: state.items,
        actionRequest: true,
        corporateId: action?.corporate?.corporateId,
        requestType: action?.corporate?.requestType,
        userId: action?.corporate?.userId
      };
    case corporateConstants.CORPORATE_ACTION_SUCCESS:
      return {
        items: state?.items?.map((item) => {
          if (item.userId === state.userId) {
            if (
              state.requestType === "Approve" ||
              state.requestType === "Reject"
            ) {
              return { ...item, isApprove: state.requestType === "Approve" };
            }
            if (state.requestType === "Delete") {
              return { ...item, isDeleted: true };
            }
            if (
              state.requestType === "Activate" ||
              state.requestType === "Inactivate"
            ) {
              return { ...item, isActive: state.requestType === "Activate" };
            }
          }
          return item;
        })
      };
    case corporateConstants.CORPORATE_ACTION_FAILURE:
      return { items: state.items, error: action.error };

    case corporateConstants.SAML_CONFIGURE_REQUEST:
      return { samlConfigure: true };
    case corporateConstants.SAML_CONFIGURE_SUCCESS:
      return { samlConfigure: false };
    case corporateConstants.SAML_CONFIGURE_FAILURE:
      return { samlConfigure: false };
    default:
      return state;
  }
}
