import { authHeader } from "../helpers";
import axios from "axios";

export const donationPreferenceService = {
  getDonationPreferences,
  saveDonationPreference,
  updateDonationPreference,
  operateActionRequest,
  repeatDonationPreference,
};

function getDonationPreferences(data) {
  return axios.get(
    process.env.REACT_APP_API_URL + "api/employee_preference_list/",
    {
      params: data,
    }
  );
}
function saveDonationPreference(data) {
  return axios.post(
    process.env.REACT_APP_API_URL + "api/save_employee_donation_preference/",
    data
  );
}
function updateDonationPreference(data) {
  return axios.post(
    process.env.REACT_APP_API_URL + "api/employee_preference_edit/",
    data
  );
}
function operateActionRequest(data) {
  return axios.post(
    process.env.REACT_APP_API_URL + "api/preference_action/",
    data
  );
}
function repeatDonationPreference(data) {
  return axios.post(
    process.env.REACT_APP_API_URL + "api/save_employee_donation_preference/",
    data
  );
}
