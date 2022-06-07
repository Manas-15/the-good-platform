import { corporateConstants } from "../constants";

export function corporates(state = {}, action) {
  switch (action.type) {
    case corporateConstants.GET_CORPORATES_REQUEST:
      return {
        loading: true,
      };
    case corporateConstants.GET_CORPORATES_SUCCESS:
      return {
        items: action.corporates?.data?.corporates,
      };
    case corporateConstants.GET_CORPORATES_FAILURE:
      return {
        error: action.error,
      };

    case corporateConstants.GET_CORPORATES_REQUEST_BY_ID:
      return {
        loading: true,
      };
    case corporateConstants.GET_CORPORATES_SUCCESS_BY_ID:
      return {
        items: action.corporates?.data?.corporates,
      };
    case corporateConstants.GET_CORPORATES_FAILURE_BY_ID:
      return {
        error: action.error,
      };

    case corporateConstants.ADD_CORPORATE_REQUEST:
      return { addingCorporate: true };
    case corporateConstants.ADD_CORPORATE_SUCCESS:
      return {};
    case corporateConstants.ADD_CORPORATE_FAILURE:
      return {};

    case corporateConstants.DELETE_CORPORATE_REQUEST:
      return { deleteCorporate: true };
    case corporateConstants.DELETE_CORPORATE_SUCCESS:
      return {};
    case corporateConstants.DELETE_CORPORATE_FAILURE:
      return {};

    case corporateConstants.CORPORATE_ACTION_REQUEST:
      return {
        items: state.items,
        actionRequest: true,
        corporateId: action.corporate.userId,
        requestType: action.corporate.requestType,
      };
    case corporateConstants.CORPORATE_ACTION_SUCCESS:
      return {
        items: state.items.map((item) => {
          if (item.userId === state.corporateId) {
            if (
              state.requestType === "Approve" ||
              state.requestType === "Reject"
            ) {
              return { ...item, isApprove: state.requestType === "Approve" };
            }
            if (
              state.requestType === "Activate" ||
              state.requestType === "Inactivate"
            ) {
              return { ...item, isActive: state.requestType === "Activate" };
            }
          }
          return item;
        }),
      };
    case corporateConstants.CORPORATE_ACTION_FAILURE:
      return { items: state.items, error: action.error };
    default:
      return state;
  }
}
