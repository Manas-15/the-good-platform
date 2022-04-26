import { authHeader } from "../helpers";
import axios from "axios";

export const donationPreferenceService = {
  saveDonationPreference,
  getDonationPreferences,
};

function getDonationPreferences() {
  return axios.get(process.env.REACT_APP_API_URL + "api/employee_preference_list/");
}
function saveDonationPreference(data) {
  return axios.post(process.env.REACT_APP_API_URL + "api/save_employee_donation_preference/", data);
}