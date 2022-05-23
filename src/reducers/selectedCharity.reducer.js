export function selectedCharity(state = {}, action) {
  switch (action.type) {
    case "GET_CHARITY":
      return {
        charity: action?.view
      };    
    default:
      return state;
  }
}
