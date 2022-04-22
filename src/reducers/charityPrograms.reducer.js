import { charityProgramConstants } from "../constants";

export function charityPrograms(state = {}, action) {
  switch (action.type) {    
    case charityProgramConstants.GET_CHARITY_PROGRAMS_REQUEST:
      return {
        loading: true,
      };
    case charityProgramConstants.GET_CHARITY_PROGRAMS_SUCCESS:
      return {
        items: action.charityPrograms.data.charity_list,
      };
    case charityProgramConstants.GET_CHARITY_PROGRAMS_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
}
