import { authHeader } from "../helpers";
import { jwtInterceptor } from "../helpers";
import axios from "axios";
import { userConstants } from "../constants";

export const socialOrganizationService = {
  getSocialOrganizations,
};

async function getSocialOrganizations(data) {
  console.log(
    "ddddddddddddddddd corporateLoggedinUser",
    data["loggedInUserType"]
  );
  if (data["loggedInUserType"] === userConstants.CORPORATE) {
    return await axios.get(
      process.env.REACT_APP_TGP_API_URL +
        "social-org/v1/validator/organisations",
      {
        headers: authHeader(),
      }
    );
  } else {
    return await axios.get(
      process.env.REACT_APP_API_URL + "api/social_program_list/",
      {
        params: data,
      }
    );
  }
  // return axios.get(process.env.REACT_APP_API_URL + "api/corporate_list", { headers: authHeader() });
}
