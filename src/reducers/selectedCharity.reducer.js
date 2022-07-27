export function selectedCharity(state = {}, action) {
  switch (action.type) {
    case "GET_CHARITY":
      return {
        ...state,
        charity: action?.view
      };
    default:
      return state;
  }
}
