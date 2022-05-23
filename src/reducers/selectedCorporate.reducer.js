export function selectedCorporate(state = {}, action) {
  switch (action.type) {
    case "GET_CORPORATE":
      return {
        corporate: action?.view
      };    
    default:
      return state;
  }
}
