import { authHeader } from "../helpers";
import { useLocation } from "react-router-dom";
import axios from "axios";

export const employeeService = {
  login,
  validateOtp,
  resendOtp,
  registerEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  setPasswordValid,
  setEmployeePassword,
  logout,
  employeeAccountRequest,
  
};

async function login(data) {
  return await axios.post(process.env.REACT_APP_API_URL + "api/login/", data);
}
async function validateOtp(data) {
  return await axios.post(
    process.env.REACT_APP_API_URL + "api/validate_otp/",
    data,
    // { headers: authHeader() }
  );
}
async function resendOtp(data) {
  return await axios.post(
    process.env.REACT_APP_API_URL + "api/resend_otp/",
    data
  );
}
function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}
async function getEmployees(data) {
  return await axios.get(process.env.REACT_APP_API_URL + "api/employee_list/", {params: data});
  // return axios.get(process.env.REACT_APP_API_URL + "api/corporate_list", { headers: authHeader() });
}
async function registerEmployee(data) {
  return await axios.post(
    process.env.REACT_APP_API_URL + "api/employee_register/",
    data
  );
}
async function getEmployee(id) {
  return await axios.post(
    process.env.REACT_APP_API_URL + "api/employee_profile/",
    id
  );
}
async function updateEmployee(id) {
  return await axios.post(
    process.env.REACT_APP_API_URL + "api/employee_update/",
    id
  );
}
async function setEmployeePassword(data) {
  return await axios.post(
    process.env.REACT_APP_API_URL + "api/set_password/",
    data
  );
}
async function setPasswordValid(data) {
  return await axios.get(
    process.env.REACT_APP_API_URL + "api/verify_set_password/",
    {
      params: data
    }
  );
}
function employeeAccountRequest(data) {
  return axios.post(
    process.env.REACT_APP_API_URL + "api/employee_account_request/",
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
