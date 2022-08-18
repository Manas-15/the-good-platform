import { authHeader } from "../helpers";
import { jwtInterceptor } from "../helpers";
import axios from "axios";
import { userConstants } from "../constants";

export const socialOrganizationService = {
  getSocialOrganizations,
  addNewProgramme,
  getAllProgram,
  programActionRequest,
  getApprovedProgram,
};

async function getSocialOrganizations(data) {
  if (data?.loggedInUserType === userConstants.INDIVIDUAL || data?.userId) {
    return await axios.post(
      process.env.REACT_APP_API_URL + "remote_api/get_social_organization/",
      data
    );
  } else {
    if (data["loggedInUserType"] === userConstants.CORPORATE) {
      return await axios.get(
        process.env.REACT_APP_TGP_API_URL +
          "social-org/v1/validator/organisations",
        {
          headers: authHeader(),
        }
      );
    } else {
      // return await axios.post(
      //   process.env.REACT_APP_API_URL + "remote_api/get_social_organization/",
      //   data
      // );
      return await axios.get(
        process.env.REACT_APP_API_URL + "api/social_program_list/",
        {
          params: data,
        }
      );
    }
  }
}

async function addNewProgramme(data) {
  return await axios.post(
    process.env.REACT_APP_API_URL + "api/employeeProgramInfo/",
    data
  );
}
async function getAllProgram(data) {
  return await axios.get(
    process.env.REACT_APP_API_URL + "api/corporateallPorgram/",
    {
      params: data,
    }
  );
}
async function programActionRequest(data) {
  return await axios.post(
    process.env.REACT_APP_API_URL + "api/corporateapproveProgram/",
    data
  );
}
async function getApprovedProgram(data) {
  return await axios.get(
    process.env.REACT_APP_API_URL + "api/employeeProgramInfo/",
    {
      params: data,
    }
  );
}
