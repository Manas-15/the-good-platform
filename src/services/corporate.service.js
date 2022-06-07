// import config from 'config';
import { authHeader } from "../helpers";
import { useLocation } from "react-router-dom";
import axios from "axios";

export const corporateService = {
  addCorporate,
  deleteCorporate,
  registerCorporate,
  getCorporates,
  getCorporateById,
  corporateAccountRequest,
};

function getCorporates() {
  return axios.get(process.env.REACT_APP_API_URL + "api/corporate_list");
}

function getCorporateById(id) {
  console.log(id, "api page data");
  return axios.get(process.env.REACT_APP_API_URL + `api/corporate_list/${id}`);
}
function registerCorporate(data) {
  return axios.post(
    process.env.REACT_APP_API_URL + "api/corporate_register/",
    data
  );
}
function deleteCorporate(id) {
  console.log(id, "delete id in service page");
  return axios.delete(
    process.env.REACT_APP_API_URL + `api/corporate_register/${id}`
  );
}
function addCorporate(data) {
  return axios.post(
    process.env.REACT_APP_API_URL + "api/corporate_register/",
    data
  );
}

function corporateAccountRequest(data) {
  return axios.post(
    process.env.REACT_APP_API_URL + "api/corporate_account_request/",
    data
  );
}
function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        const location = useLocation();
        location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
