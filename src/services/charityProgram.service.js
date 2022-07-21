import { authHeader } from "../helpers";
import axios from "axios";
import { userConstants } from "../constants";

export const charityProgramService = {
  getCharityPrograms,
  saveDonationPreference,
  operateSponsorRequest,
  operateBulkSponsorRequest,
  operateDenyRequest,
  checkBeforeUnpromote,
  checkBeforeBulkUnpromote,
  getProgramDetail,
};

function getCharityPrograms(data) {
  // return axios.get(process.env.REACT_APP_API_URL + "api/social_charity_list/", {
  //   params: data,
  // });
  console.log("data?.userType", data?.userType, data?.userId);
  if (data?.userType === userConstants.INDIVIDUAL_VIEW || data?.userId) {
    return axios.get(process.env.REACT_APP_API_URL + "remote_api/charity/", {
      params: data,
    });
  } else if (data?.userType === userConstants.CORPORATE_VIEW) {
    return axios.get(
      process.env.REACT_APP_TGP_API_URL +
        "project-management/v1/validator/projects",
      {
        headers: authHeader(),
      }
    );
  } else {
    return axios.get(process.env.REACT_APP_API_URL + "api/charity_list/", {
      params: data,
    });
  }
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
function operateBulkSponsorRequest(data) {
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
function checkBeforeBulkUnpromote(data) {
  return axios.get(
    process.env.REACT_APP_API_URL + "api/check_donation_preference/",
    {
      params: data,
    }
  );
}
function getProgramDetail(data) {
  const id = data?.programId;
  const corporateLoggedUser =
    data?.loggedInUserType?.toString() === userConstants.CORPORATE?.toString();
  const individualLoggedUser =
    data?.loggedInUserType?.toString() === userConstants.INDIVIDUAL?.toString();

  if (individualLoggedUser || data?.userId) {
    return axios.get(
      process.env.REACT_APP_API_URL + "remote_api/charity_details/",
      { params: data }
    );
  } else if (corporateLoggedUser) {
    return axios.get(
      process.env.REACT_APP_TGP_API_URL + `project-management/v1/project/${id}`,
      { headers: authHeader() }
    );
  } else {
    return axios.get(process.env.REACT_APP_API_URL + "api/programDetails/", {
      params: data,
    });
  }
}
