// import config from 'config';
import { authHeader } from "../helpers";
import { useLocation } from "react-router-dom";
import axios from "axios";

export const corporateService = {
  addCorporate,
  deleteCorporate,
  updateCorporate,
  registerCorporate,
  getCorporates,
  corporateAccountRequest,
  oidcConfigure,
  getEmployeeCustomProgram,
  employeeProgramAction,
  addEmployeeProgram
};

function getCorporates(data) {
  return axios.get(
    process.env.REACT_APP_API_URL + "remote_api/corporateList/",
    {
      params: data
    }
  ); //process.env.REACT_APP_API_URL + "api/corporate_list"
}

function registerCorporate(data) {
  return axios.post(
    process.env.REACT_APP_API_URL + "api/corporate_register/",
    data
  );
}
function updateCorporate(corporate) {
  return axios.post(
    process.env.REACT_APP_API_URL + "api/editCorporate/",
    corporate
  );
}
function deleteCorporate(corporateId) {
  return axios.post(
    process.env.REACT_APP_API_URL + "api/removeCorporate/",
    corporateId
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
    process.env.REACT_APP_API_URL + "api/userAccountRequest/",
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

function oidcConfigure(data) {
  console.log(data, "saml api call");

  return axios.post(
    process.env.REACT_APP_API_URL + "api/corporateSetting/",
    data
  );
}

async function getEmployeeCustomProgram(data) {
  return await axios.get(
    process.env.REACT_APP_API_URL + "api/corporateallPorgram/",
    {
      params: data
    }
  );
}

async function employeeProgramAction(data) {
  return await axios.post(
    process.env.REACT_APP_API_URL + "api/corporateapproveProgram/",
    data
  );
}

async function addEmployeeProgram(data) {
  return await axios.post(
    process.env.REACT_APP_API_URL + "api/employeeProgramInfo/",
    data
  );
}
