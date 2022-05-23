// import { authHeader } from "../helpers";
import { jwtInterceptor } from "../helpers";
import { useLocation } from "react-router-dom";
import axios from "axios";

export const socialOrganizationService = {
  getSocialOrganizations,
};

async function getSocialOrganizations(data) {
  return await axios.get(
    process.env.REACT_APP_API_URL + "api/social_program_list/",
    {
      params: data,
    }
  );
  // return axios.get(process.env.REACT_APP_API_URL + "api/corporate_list", { headers: authHeader() });
}
