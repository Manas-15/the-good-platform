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
        saved: true
      };
    case donationPreferenceConstants.SAVE_DONATION_PREFERENCE_FAILURE:
      return {
        saved: false,
        error: action.error,
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
        error: action.error,
      };
    default:
      return state;
  }
}
