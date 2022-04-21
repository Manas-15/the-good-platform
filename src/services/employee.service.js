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
  setEmployeePassword,
  logout,
};

async function login(data) {
  console.log("validate login employee >>>>>>>>>>>>>>>>>>>");
  // process.env.REACT_APP_API_URL
  return await axios.post(process.env.REACT_APP_API_URL + "api/login/", data)
}
async function validateOtp(data) {
  console.log("validate otp employee >>>>>>>>>>>>>>>>>>>");
  // process.env.REACT_APP_API_URL
  // let response = axios.post(process.env.REACT_APP_API_URL + "api/validate_otp/", data);
  return await axios.post(process.env.REACT_APP_API_URL + "api/validate_otp/", data, { headers: authHeader()}) // promise;
}
async function resendOtp(data) {
  console.log("validate otp employee >>>>>>>>>>>>>>>>>>>");
  // process.env.REACT_APP_API_URL
  return await axios.post(process.env.REACT_APP_API_URL + "api/resend_otp/", data);
}
function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}
async function getEmployees() {
  return await axios.get(process.env.REACT_APP_API_URL + "api/employee_list");
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
  return await axios.post(process.env.REACT_APP_API_URL + "api/employee_update/", id);
}
async function setEmployeePassword(data) {
  return await axios.post(process.env.REACT_APP_API_URL + "api/employee_password_save/", data);
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
