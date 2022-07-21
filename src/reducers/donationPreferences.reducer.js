import { donationPreferenceConstants } from "../constants";

export function donationPreferences(state = {}, action) {
  switch (action.type) {
    case donationPreferenceConstants.GET_DONATION_PREFERENCES_REQUEST:
      return {
        loading: true
      };
    case donationPreferenceConstants.GET_DONATION_PREFERENCES_SUCCESS:
      return {
        items: action?.preferences?.data?.preference,
        totalCount: action?.preferences?.data?.count
      };
    case donationPreferenceConstants.GET_DONATION_PREFERENCES_FAILURE:
      return {
        error: action.error
      };
    case donationPreferenceConstants.SAVE_DONATION_PREFERENCE_REQUEST:
      return {
        saved: false,
        loading: true
      };
    case donationPreferenceConstants.SAVE_DONATION_PREFERENCE_SUCCESS:
      return {
        saved: true
      };
    case donationPreferenceConstants.SAVE_DONATION_PREFERENCE_FAILURE:
      return {
        saved: false,
        error: action.error
      };
    case donationPreferenceConstants.UPDATE_DONATION_PREFERENCE_REQUEST:
      return {
        loading: true,
        items: state.items
      };
    case donationPreferenceConstants.UPDATE_DONATION_PREFERENCE_SUCCESS:
      return {
        items: state.items
      };
    case donationPreferenceConstants.UPDATE_DONATION_PREFERENCE_FAILURE:
      return {
        error: action.error
      };
    case donationPreferenceConstants.PREFERENCE_ACTION_REQUEST:
      return {
        ...state,
        items: state?.items,
        actionRequest: true,
        preferenceId: action?.donationPreferences?.preferenceId,
        requestType: action?.donationPreferences?.requestType
      };
    case donationPreferenceConstants.PREFERENCE_ACTION_SUCCESS:
      const suspendPreference = state?.items?.["active"]?.filter(
        (element) => element.employeePreferenceId === state?.preferenceId
      );
      const resumePreference = state?.items?.["complete"]?.filter(
        (element) => element.employeePreferenceId === state?.preferenceId
      );
      if (suspendPreference?.length > 0) {
        suspendPreference[0].status = donationPreferenceConstants?.SUSPENDED;
      }
      if (resumePreference?.length > 0) {
        resumePreference[0].status = donationPreferenceConstants?.RESUMED;
      }
      return {
        ...state,
        actionRequest: false,
        items: {
          complete:
            state?.requestType === donationPreferenceConstants?.DELETE
              ? state?.items?.active?.map?.((item) => {
                  if (item?.employeePreferenceId === state?.preferenceId) {
                    return {
                      ...item,
                      isDeleted:
                        state?.requestType ===
                        donationPreferenceConstants?.DELETE
                    };
                  }
                  return item;
                })
              : state?.requestType === donationPreferenceConstants?.SUSPEND
              ? state?.items?.["complete"]
                ? [...state?.items?.["complete"], suspendPreference[0]]
                : [suspendPreference[0]]
              : state?.items?.["complete"].filter(function (preference) {
                  return (
                    preference.employeePreferenceId !==
                    resumePreference[0]?.employeePreferenceId
                  );
                }),
          active:
            state?.requestType === donationPreferenceConstants?.DELETE
              ? state?.items?.active?.map?.((item) => {
                  if (item?.employeePreferenceId === state?.preferenceId) {
                    return {
                      ...item,
                      isDeleted:
                        state?.requestType ===
                        donationPreferenceConstants?.DELETE
                    };
                  }
                  return item;
                })
              : state?.requestType === donationPreferenceConstants?.RESUME
              ? state?.items?.["active"]
                ? [...state?.items?.["active"], resumePreference[0]]
                : [resumePreference[0]]
              : state?.items?.["active"].filter(function (preference) {
                  return (
                    preference.employeePreferenceId !==
                    suspendPreference[0]?.employeePreferenceId
                  );
                })
        }
        // items: state?.items?.active?.map?.((item) => {
        //   if (item?.employeePreferenceId === state?.preferenceId) {
        //     if (state?.requestType === donationPreferenceConstants?.DELETE) {
        //       return {
        //         ...item,
        //         isDeleted:
        //           state?.requestType === donationPreferenceConstants?.DELETE,
        //       };
        //     }
        //     if (state?.requestType === donationPreferenceConstants?.SUSPEND) {
        //       return {
        //         ...item,
        //         status: donationPreferenceConstants?.SUSPENDED,
        //       };
        //     }
        //     if (state?.requestType === donationPreferenceConstants?.RESUME) {
        //       return { ...item, status: donationPreferenceConstants?.RESUMED };
        //     }
        //   }
        //   return item;
        // }),
      };
    case donationPreferenceConstants.PREFERENCE_ACTION_FAILURE:
      return {
        ...state,
        actionRequest: false,
        items: state.items,
        error: action.error
      };
    case donationPreferenceConstants.REPEAT_DONATION_PREFERENCE_REQUEST:
      return {
        ...state,
        loading: true,
        preference: action?.preference
      };
    case donationPreferenceConstants.REPEAT_DONATION_PREFERENCE_SUCCESS:
      return {
        ...state,
        items: {
          active: state?.items?.["active"]
            ? [...state?.items?.["active"], state?.preference]
            : [state?.preference],
          complete: state?.items?.["complete"]
        },
        loading: false
      };
    case donationPreferenceConstants.REPEAT_DONATION_PREFERENCE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}
