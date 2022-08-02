// import { authHeader } from "../helpers";
import { jwtInterceptor } from "../helpers";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { userConstants } from "../constants";
import { authHeader } from "../helpers";

export const employeeService = {
  login,
  validateOtp,
  resendOtp,
  register,
  getEmployees,
  getEmployee,
  getOtherUserDetail,
  updateEmployee,
  setPasswordValid,
  setEmployeePassword,
  logout,
  employeeAccountRequest,
  addEmployee,
  bulkImport,
  getCorporates,
};

async function login(data) {
  if (
    data?.loginType === userConstants.EMPLOYEE_VIEW ||
    data?.loginType === userConstants.INDIVIDUAL_VIEW
  ) {
    return await axios.post(`${process.env.REACT_APP_API_URL}api/login/`, data);
  } else {
    return await axios.post(
      `${process.env.REACT_APP_TGP_API_URL}auth/v1/auth/login`,
      { username: data?.email, password: data?.password }
    );
  }
}

function getOtherUserDetail() {
  return axios.get(process.env.REACT_APP_TGP_API_URL + "social-org/v1/user", {
    headers: authHeader(),
  });
}

async function validateOtp(data) {
  return await axios.post(
    process.env.REACT_APP_API_URL + "api/validate_otp/",
    data
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
  return await axios.get(process.env.REACT_APP_API_URL + "api/employee_list/", {
    params: data,
  });
  // return axios.get(process.env.REACT_APP_API_URL + "api/corporate_list", { headers: authHeader() });
}
async function register(data, userType) {
  if (userType === userConstants.EMPLOYEE) {
    return await axios.post(
      process.env.REACT_APP_API_URL + "api/employee_register/",
      data
    );
  } else if (userType === userConstants.INDIVIDUAL) {
    return await axios.post(
      process.env.REACT_APP_API_URL + "api/individual_register/",
      data
    );
  }
  return null;
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
      params: data,
    }
  );
}
function employeeAccountRequest(data) {
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

function addEmployee(data) {
  return axios.post(
    process.env.REACT_APP_API_URL + "api/employee_register/",
    data
  );
}

async function bulkImport(formData) {
  return await axios.post(
    process.env.REACT_APP_API_URL + "api/fileUpload/",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
}
async function getCorporates(formData) {
  return await axios.get(
    process.env.REACT_APP_API_URL + "remote_api/corporateList/"
  );
}
