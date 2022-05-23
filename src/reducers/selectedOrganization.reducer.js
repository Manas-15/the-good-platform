export function selectedOrganization(state = {}, action) {
  switch (action.type) {
    case "GET_ID":
      return {
        id: action?.view,
      };
    default:
      return state;
  }
}
