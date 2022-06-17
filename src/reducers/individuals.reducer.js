import { individualConstants } from "../constants";

export function individuals(state = {}, action) {
  switch (action.type) {
    case individualConstants.GET_INDIVIDUALS_REQUEST:
      return {
        loading: true,
      };
    case individualConstants.GET_INDIVIDUALS_SUCCESS:
      // console.log(action);
      return {
        items: action.individuals?.data?.individual_list,
      };
    case individualConstants.GET_INDIVIDUALS_FAILURE:
      return {
        error: action.error,
      };
    case individualConstants.INDIVIDUAL_ACTION_REQUEST:
      return { items: state.items, actionRequest: true };
    case individualConstants.INDIVIDUAL_ACTION_SUCCESS:
      console.log(state.requestType);
      return {
        items: state?.items?.map((item) => {
          if (item.indId === state.userId) {
            console.log(state.requestType);
            if (
              state.requestType === "Activate" ||
              state.requestType === "Inactivate"
            ) {
              return { ...item, status: state.requestType === "Activate" };
            }
          }
          return item;
        }),
      };
    case individualConstants.INDIVIDUAL_ACTION_FAILURE:
      return { items: state.items, error: action.error };
    default:
      return state;
  }
}
