// import config from 'config';
import { authHeader } from "../helpers";
import { useLocation } from "react-router-dom";
import axios from "axios";

export const employeeService = {
  registerEmployee,
  getEmployees,
};

function getEmployees() {
  return axios.get(process.env.REACT_APP_API_URL + "api/employee_list");
}
function registerEmployee(data) {
  return axios.post(
    process.env.REACT_APP_API_URL + "api/employee_register/",
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
