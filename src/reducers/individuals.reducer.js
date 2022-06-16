import { individualConstants } from "../constants";

export function individuals(state = {}, action) {
  switch (action.type) {
    case individualConstants.GET_INDIVIDUALS_REQUEST:
      return {
        loading: true
      };
    case individualConstants.GET_INDIVIDUALS_SUCCESS:
      return {
        items: action.individuals?.data?.individual_list
      };
    case individualConstants.GET_INDIVIDUALS_FAILURE:
      return {
        error: action.error
      };
    default:
      return state;
  }
}
