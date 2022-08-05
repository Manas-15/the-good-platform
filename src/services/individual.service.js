// import config from 'config';
// import { authHeader } from "../helpers";
// import { useLocation } from "react-router-dom";
import axios from "axios";

export const individualService = {
  getIndividuals,
  individualAccountRequest
};

function getIndividuals() {
  return axios.get(process.env.REACT_APP_API_URL + "api/individualList");
}
function individualAccountRequest(data) {
  return axios.post(
    process.env.REACT_APP_API_URL + "api/userAccountRequest/",
    data
  );
}
