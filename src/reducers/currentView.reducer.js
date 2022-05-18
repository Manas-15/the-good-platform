export function currentView(state = {}, action) {
  switch (action.type) {
    case "CURRENT_VIEW":
      return {
        currentView: action?.view
      };    
    default:
      return state;
  }
}
