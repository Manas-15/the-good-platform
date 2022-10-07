import { charityProgramConstants } from "../constants";

export function selectedCharity(state = {}, action) {
  switch (action.type) {
    case "GET_CHARITY":
      return {
        ...state,
        charity: action?.view
      };
    case charityProgramConstants.SAVE_PROGRAM_PRICE_REQUEST:
      return {
        ...state,
        saveProgramPrice: true
      };
    case charityProgramConstants.SAVE_PROGRAM_PRICE_SUCCESS:
      return {
        ...state,
        saveProgramPrice: false
      };
    case charityProgramConstants.SAVE_PROGRAM_PRICE_FAILURE:
      return {
        ...state,
        saveProgramPrice: false
      };
    case charityProgramConstants.FETCH_PROGRAM_PRICE_REQUEST:
      return {
        ...state,
        fetchingPrice: true,
        fetchedPrice: null
      };
    case charityProgramConstants.FETCH_PROGRAM_PRICE_SUCCESS:
      return {
        ...state,
        fetchingPrice: false,
        fetchedPrice: action?.data?.data
      };
    case charityProgramConstants.FETCH_PROGRAM_PRICE_FAILURE:
      return {
        ...state,
        fetchingPrice: false,
        fetchedPrice: null
      };
    default:
      return state;
  }
}
