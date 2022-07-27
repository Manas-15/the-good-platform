import {
  charityProgramConstants,
  userConstants,
  viewPortalConstants
} from "../constants";

export function charityPrograms(state = {}, action) {
  switch (action.type) {
    case charityProgramConstants.GET_CHARITY_PROGRAMS_REQUEST:
      return {
        loading: true,
        userType: action?.data?.userType,
        userRole: action?.data?.userRole
      };
    case charityProgramConstants.GET_CHARITY_PROGRAMS_SUCCESS:
      console.log(">>>>>>>>>>>>>>> state?.userRole", state?.userRole);
      if (state?.userRole === viewPortalConstants.PAYMENT_ADMIN) {
        return {
          items: action?.charityPrograms?.data?.data?.data?.map?.((item) => {
            if (item?.unitPrice === undefined) {
              return { ...item, unitPrice: 500 };
            }
            return item;
          })
        };
      } else if (
        state?.userType === "Employee" ||
        state?.userType === "Corporate"
      ) {
        console.log(">>>>>>>>>>>>>>> 33333333333333333", state?.userRole);
        // userType: action?.data?.userType
        return {
          ...state,
          loading: false,
          items:
            state?.userType !== userConstants.INDIVIDUAL_VIEW
              ? {
                  sponsored: action?.charityPrograms?.data?.charity_list?.[
                    "sponsored"
                  ]?.map((charity) => {
                    return { ...charity, unitPrice: 500 };
                  }),
                  others: action?.charityPrograms?.data?.charity_list?.[
                    "others"
                  ]?.map((charity) => {
                    return { ...charity, unitPrice: 500 };
                  })
                }
              : action?.charityPrograms?.data?.charity_list?.map((charity) => {
                  return { ...charity, unitPrice: 500 };
                })
        };
      } else {
        return {
          items: action?.charityPrograms?.data?.charity_list?.map?.((item) => {
            if (item?.unitPrice === undefined) {
              return { ...item, unitPrice: 500 };
            }
            return item;
          })
        };
      }
    case charityProgramConstants.GET_CHARITY_PROGRAMS_FAILURE:
      return {
        error: action.error
      };
    case charityProgramConstants.SAVE_DONATION_PREFERENCE_REQUEST:
      return {
        ...state,
        loading: true,
        charityId: action?.data?.charityProgramId,
        donationAmount: action?.data?.donationAmount,
        frequency: action?.data?.frequency
      };
    case charityProgramConstants.SAVE_DONATION_PREFERENCE_SUCCESS:
      return {
        ...state,
        items: {
          sponsored: state?.items["sponsored"]?.map((charity) =>
            charity.charityId === state.charityId
              ? {
                  ...charity,
                  donated: true,
                  donationAmount: state?.donationAmount,
                  frequency: state?.frequency
                }
              : charity
          ),
          other: state?.items["others"]?.map((charity) =>
            charity.charityId === state.charityId
              ? { ...charity, donated: true }
              : charity
          )
        },
        charityId: null,
        donationAmount: null,
        frequency: null,
        loading: false
      };
    case charityProgramConstants.SAVE_DONATION_PREFERENCE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case charityProgramConstants.OPERATE_SPONSOR_REQUEST:
      return {
        ...state,
        loading: true,
        programId: action?.program?.charityId
      };
    case charityProgramConstants.OPERATE_SPONSOR_SUCCESS:
      const operateCharity = state?.items?.["others"]?.filter(
        (element) => element.id === state.programId
      );
      return {
        ...state,
        items: {
          sponsored: state?.items?.["sponsored"]
            ? [...state?.items?.["sponsored"], operateCharity[0]]
            : [operateCharity[0]],
          others: state?.items?.["others"]?.filter(function (charity) {
            return charity.id !== operateCharity[0]?.id;
          })
        },
        loading: false
      };
    case charityProgramConstants.OPERATE_SPONSOR_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case charityProgramConstants.OPERATE_DENY_REQUEST:
      return {
        ...state,
        loading: true,
        programId: action?.program?.programId
      };
    case charityProgramConstants.OPERATE_DENY_SUCCESS:
      const denyCharity = state?.items?.["sponsored"]?.filter(
        (element) => element.id === state.programId
      );
      return {
        ...state,
        items: {
          others: state?.items?.["others"]
            ? [...state?.items?.["others"], denyCharity[0]]
            : [denyCharity[0]],
          sponsored: state?.items?.["sponsored"]?.filter(function (charity) {
            return charity.id !== denyCharity[0]?.id;
          })
        },
        loading: false
      };
    case charityProgramConstants.OPERATE_DENY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case charityProgramConstants.CHECK_BEFORE_UNPROMOTE_REQUEST:
      return {
        ...state,
        loading: true,
        programId: action?.program?.programId
      };
    case charityProgramConstants.CHECK_BEFORE_UNPROMOTE_SUCCESS:
      return {
        ...state,
        employeeCount: action?.data?.data?.count,
        // items: {
        //   other: state?.items?.["other"],
        //   sponsored: state?.items?.["sponsored"]?.map((item) => {
        //     if (item?.charityId === state?.programId) {
        //       return {
        //         ...item,
        //         employeeCount: action?.data?.data?.count,
        //       };
        //     }
        //     return item;
        //   }),
        // },
        loading: false
      };
    case charityProgramConstants.CHECK_BEFORE_UNPROMOTE_FAILURE:
      return {
        error: action.error,
        loading: false
      };
    case charityProgramConstants.CHECK_BEFORE_BULK_UNPROMOTE_REQUEST:
      return {
        ...state,
        loading: true,
        programId: action?.program?.programId
      };
    case charityProgramConstants.CHECK_BEFORE_BULK_UNPROMOTE_SUCCESS:
      return {
        ...state,
        employeeCount: action?.data?.data?.count,
        // items: {
        //   other: state?.items?.["other"],
        //   sponsored: state?.items?.["sponsored"]?.map((item) => {
        //     if (item?.charityId === state?.programId) {
        //       return {
        //         ...item,
        //         employeeCount: action?.data?.data?.count,
        //       };
        //     }
        //     return item;
        //   }),
        // },
        loading: false
      };
    case charityProgramConstants.CHECK_BEFORE_BULK_UNPROMOTE_FAILURE:
      return {
        error: action.error,
        loading: false
      };

    case charityProgramConstants.GET_PROGRAM_DETAIL_REQUEST:
      return {
        ...state,
        loading: true
      };
    case charityProgramConstants.GET_PROGRAM_DETAIL_SUCCESS:
      return {
        ...state,
        // selectedprogramDetail: {
        //   ...action?.programDetail?.data?.data,
        //   unitPrice: 500
        // },
        // programDetail: action?.programDetail?.data?.data,
        programDetail: {
          ...action?.programDetail?.data?.data,
          unitPrice: 500
        },
        loading: false
      };
    case charityProgramConstants.GET_PROGRAM_DETAIL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}
