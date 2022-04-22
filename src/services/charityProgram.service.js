import { authHeader } from "../helpers";
import axios from "axios";

export const charityProgramService = {
  getCharityPrograms,
};

function getCharityPrograms() {
  return axios.get(process.env.REACT_APP_API_URL + "api/charity_list");
}