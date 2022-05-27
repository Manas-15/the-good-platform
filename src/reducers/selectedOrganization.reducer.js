export function selectedOrganization(state = {}, action) {
  switch (action.type) {
    case "GET_ORGANIZATION":
      return {
        organization: action?.view,
      };
    default:
      return state;
  }
}
