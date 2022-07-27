import { userConstants } from "../constants";

export function user(state = {}, action) {
  switch (action.type) {
    case userConstants.USER_LOGIN_REQUEST:
      return {
        loggingIn: true,
      };
    case userConstants.USER_LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action?.data?.data,
        otpVerified: false,
      };
    case userConstants.USER_LOGIN_FAILURE:
      return { loggingIn: false };
    case userConstants.USER_DETAIL_REQUEST:
      return {
        ...state,
        loggingIn: true,
      };
    case userConstants.USER_DETAIL_SUCCESS:
      return {
        ...state,
        loggingIn: true,
        detail: action?.data?.data?.data,
      };
    case userConstants.USER_DETAIL_FAILURE:
      return { ...state, loggingIn: false };
    case userConstants.LOGGED_IN_USER_TYPE:
      return { ...state, loggedinUserType: action?.view };
    case userConstants.LOGOUT:
      return {};
    case userConstants.GETALL_REQUEST:
      return {
        loading: true,
      };
    case userConstants.GETALL_SUCCESS:
      return {
        items: action.users,
      };
    case userConstants.GETALL_FAILURE:
      return {
        error: action.error,
      };
    case userConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map((user) =>
          user.id === action.id ? { ...user, deleting: true } : user
        ),
      };
    case userConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter((user) => user.id !== action.id),
      };
    case userConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user
      return {
        ...state,
        items: state.items.map((user) => {
          if (user.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = user;
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }

          return user;
        }),
      };
    default:
      return state;
  }
}
