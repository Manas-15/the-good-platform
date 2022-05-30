import { authHeader } from "../helpers";
import axios from "axios";

export const charityProgramService = {
  getCharityPrograms,
  saveDonationPreference,
  operateSponsorRequest,
  operateDenyRequest,
  checkBeforeUnpromote,
};

function getCharityPrograms(data) {
  // return axios.get(process.env.REACT_APP_API_URL + "api/social_charity_list/", {
  //   params: data,
  // });
  return axios.get(process.env.REACT_APP_API_URL + "api/charity_list/", {
    params: data,
  });
}
function saveDonationPreference(data) {
  return axios.post(
    process.env.REACT_APP_API_URL + "api/save_employee_donation_preference/",
    data
  );
}
function operateSponsorRequest(data) {
  return axios.post(
    process.env.REACT_APP_API_URL + "api/save_corporate_sponser/",
    data
  );
}
function operateDenyRequest(data) {
  return axios.post(
    process.env.REACT_APP_API_URL + "api/remove_corporate_sponser/",
    data
  );
}
function checkBeforeUnpromote(data) {
  return axios.get(
    process.env.REACT_APP_API_URL + "api/check_donation_preference/",
    {
      params: data,
    }
  );
}
