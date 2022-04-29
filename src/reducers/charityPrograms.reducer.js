import { charityProgramConstants } from "../constants";

export function charityPrograms(state = {}, action) {
  switch (action.type) {
    case charityProgramConstants.GET_CHARITY_PROGRAMS_REQUEST:
      return {
        loading: true,
      };
    case charityProgramConstants.GET_CHARITY_PROGRAMS_SUCCESS:
      return {
        items: action?.charityPrograms?.data?.charity_list,
      };
    case charityProgramConstants.GET_CHARITY_PROGRAMS_FAILURE:
      return {
        error: action.error,
      };
    case charityProgramConstants.SAVE_DONATION_PREFERENCE_REQUEST:
      return {
        ...state,
        loading: true,
        charityId: action?.data?.charityProgramId,
      };
    case charityProgramConstants.SAVE_DONATION_PREFERENCE_SUCCESS:
      return {
        ...state,
        items: {
          sponser: state.items["sponser"].map((charity) =>
          charity.charityId === state.charityId
              ? { ...charity, donated: true }
              : charity
          ),
          other: state.items["other"].map((charity) =>
          charity.charityId === state.charityId
              ? { ...charity, donated: true }
              : charity
          ),
        },
        loading: false,
      };
    case charityProgramConstants.SAVE_DONATION_PREFERENCE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}
