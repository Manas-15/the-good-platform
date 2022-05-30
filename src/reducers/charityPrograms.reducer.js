import { charityProgramConstants } from "../constants";

export function charityPrograms(state = {}, action) {
  switch (action.type) {
    case charityProgramConstants.GET_CHARITY_PROGRAMS_REQUEST:
      return {
        loading: true,
      };
    case charityProgramConstants.GET_CHARITY_PROGRAMS_SUCCESS:
      return {
        items: action?.charityPrograms?.data?.charity_list,
      };
    case charityProgramConstants.GET_CHARITY_PROGRAMS_FAILURE:
      return {
        error: action.error,
      };
    case charityProgramConstants.SAVE_DONATION_PREFERENCE_REQUEST:
      return {
        ...state,
        loading: true,
        charityId: action?.data?.charityProgramId,
      };
    case charityProgramConstants.SAVE_DONATION_PREFERENCE_SUCCESS:
      return {
        ...state,
        items: {
          sponsored: state?.items["sponsored"]?.map((charity) =>
            charity.charityId === state.charityId
              ? { ...charity, donated: true }
              : charity
          ),
          other: state?.items["other"]?.map((charity) =>
            charity.charityId === state.charityId
              ? { ...charity, donated: true }
              : charity
          ),
        },
        loading: false,
      };
    case charityProgramConstants.SAVE_DONATION_PREFERENCE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case charityProgramConstants.OPERATE_SPONSOR_REQUEST:
      return {
        ...state,
        loading: true,
        programId: action?.program?.charityId,
      };
    case charityProgramConstants.OPERATE_SPONSOR_SUCCESS:
      const operateCharity = state?.items?.["other"]?.filter(
        (element) => element.charityId === state.programId
      );
      return {
        ...state,
        items: {
          sponsored: state?.items?.["sponsored"]
            ? [...state?.items?.["sponsored"], operateCharity[0]]
            : [operateCharity[0]],
          other: state?.items?.["other"]?.filter(function (charity) {
            return charity.charityId !== operateCharity[0]?.charityId;
          }),
        },
        loading: false,
      };
    case charityProgramConstants.OPERATE_SPONSOR_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case charityProgramConstants.OPERATE_DENY_REQUEST:
      return {
        ...state,
        loading: true,
        programId: action?.program?.programId,
      };
    case charityProgramConstants.OPERATE_DENY_SUCCESS:
      const denyCharity = state?.items?.["sponsored"]?.filter(
        (element) => element.charityId === state.programId
      );
      return {
        ...state,
        items: {
          other: state?.items?.["other"]
            ? [...state?.items?.["other"], denyCharity[0]]
            : [denyCharity[0]],
          sponsored: state?.items?.["sponsored"]?.filter(function (charity) {
            return charity.charityId !== denyCharity[0]?.charityId;
          }),
        },
        loading: false,
      };
    case charityProgramConstants.OPERATE_DENY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case charityProgramConstants.CHECK_BEFORE_UNPROMOTE_REQUEST:
      return {
        ...state,
        loading: true,
        programId: action?.program?.programId,
      };
    case charityProgramConstants.CHECK_BEFORE_UNPROMOTE_SUCCESS:
      
      return {
        ...state,
        items: {
          other: state?.items?.["other"],
          sponsored: state?.items?.["sponsored"]?.map((item) => {
            if (
              item?.charityId === state?.programId
            ) {
              return {
                ...item,
                employeeCount: action?.data?.data?.count,
              };
            }
            return item;
          }),
        },
        loading: false,
      };
    case charityProgramConstants.CHECK_BEFORE_UNPROMOTE_FAILURE:
      return {
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
}
