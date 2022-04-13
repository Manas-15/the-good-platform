import { corporateConstants } from "../constants";

export function corporates(state = {}, action) {
  switch (action.type) {
    case corporateConstants.GET_CORPORATES_REQUEST:
      return {
        loading: true,
      };
    case corporateConstants.GET_CORPORATES_SUCCESS:
      return {
        items: action.corporates,
      };
    case corporateConstants.GET_CORPORATES_FAILURE:
      return {
        error: action.error,
      };
    case corporateConstants.ADD_CORPORATE_REQUEST:
      return { addingCorporate: true };
    case corporateConstants.ADD_CORPORATE_SUCCESS:
      return {};
    case corporateConstants.ADD_CORPORATE_FAILURE:
      return {};
    case corporateConstants.APPROVE_CORPORATE_REQUEST:
      return { approveCorporate: true };
    case corporateConstants.APPROVE_CORPORATE_SUCCESS:
      return { item: action.corporate };
    case corporateConstants.APPROVE_CORPORATE_FAILURE:
      return {};
    case corporateConstants.REJECT_CORPORATE_REQUEST:
      return { rejectCorporate: true };
    case corporateConstants.REJECT_CORPORATE_SUCCESS:
      return { item: action.corporate };
    case corporateConstants.REJECT_CORPORATE_FAILURE:
      return {};
    default:
      return state;
  }
}
