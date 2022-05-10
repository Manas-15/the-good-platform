import { donationPreferenceConstants } from "../constants";

export function donationPreferences(state = {}, action) {
  switch (action.type) {
    case donationPreferenceConstants.GET_DONATION_PREFERENCES_REQUEST:
      return {
        loading: true,
      };
    case donationPreferenceConstants.GET_DONATION_PREFERENCES_SUCCESS:
      return {
        items: action.preferences.data.preference,
      };
    case donationPreferenceConstants.GET_DONATION_PREFERENCES_FAILURE:
      return {
        error: action.error,
      };
    case donationPreferenceConstants.SAVE_DONATION_PREFERENCE_REQUEST:
      return {
        saved: false,
        loading: true,
      };
    case donationPreferenceConstants.SAVE_DONATION_PREFERENCE_SUCCESS:
      return {
        saved: true,
      };
    case donationPreferenceConstants.SAVE_DONATION_PREFERENCE_FAILURE:
      return {
        saved: false,
        error: action.error,
      };
    case donationPreferenceConstants.UPDATE_DONATION_PREFERENCE_REQUEST:
      return {
        loading: true,
        items: state.items,
      };
    case donationPreferenceConstants.UPDATE_DONATION_PREFERENCE_SUCCESS:
      return {
        items: state.items,
      };
    case donationPreferenceConstants.UPDATE_DONATION_PREFERENCE_FAILURE:
      return {
        error: action.error,
      };
    case donationPreferenceConstants.PREFERENCE_ACTION_REQUEST:
      return {
        ...state,
        items: state.items,
        actionRequest: true,
        preferenceId: action?.donationPreferences?.preferenceId,
        requestType: action?.donationPreferences?.requestType,
      };
    case donationPreferenceConstants.PREFERENCE_ACTION_SUCCESS:
      return {
        ...state,
        actionRequest: false,
        items: state.items.map((item) => {
          if (item?.employeePreferenceId === state?.preferenceId) {
            if (state?.requestType === donationPreferenceConstants?.DELETE) {
              return {
                ...item,
                isDeleted:
                  state?.requestType === donationPreferenceConstants?.DELETE,
              };
            }
            if (state?.requestType === donationPreferenceConstants?.SUSPEND) {
              return {
                ...item,
                status: donationPreferenceConstants?.SUSPENDED,
              };
            }
            if (state?.requestType === donationPreferenceConstants?.RESUME) {
              return { ...item, status: donationPreferenceConstants?.RESUMED };
            }
          }
          return item;
        }),
      };
    case donationPreferenceConstants.PREFERENCE_ACTION_FAILURE:
      return {
        ...state,
        actionRequest: false,
        items: state.items,
        error: action.error,
      };
    default:
      return state;
  }
}
