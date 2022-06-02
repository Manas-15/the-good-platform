import { authHeader } from "../helpers";
import { jwtInterceptor } from "../helpers";
import axios from "axios";
import { userConstants } from "../constants";

export const socialOrganizationService = {
  getSocialOrganizations,
};

async function getSocialOrganizations(data) {
  console.log("ddddddddddddddddd data?.individualId", data?.individualId)
  if (data?.loggedInUserType === userConstants.INDIVIDUAL) {
    return await axios.post(
      process.env.REACT_APP_API_URL + "remote_api/get_social_organization/"
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
      return await axios.get(
        process.env.REACT_APP_API_URL + "api/social_program_list/",
        {
          params: data,
        }
      );
    }
  }
}
