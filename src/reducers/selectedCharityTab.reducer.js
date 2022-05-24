export function selectedCharityTab(state = {}, action) {
  switch (action.type) {
    case "GET_TAB_TYPE":
      return {
        tab: action?.view
      };    
    default:
      return state;
  }
}
