// import config from 'config';
import { authHeader } from "../helpers";
import { useLocation } from "react-router-dom";
import API from "./../services/api";
import axios from "axios";

export const corporateService = {
  addCorporate,
  registerCorporate,
  getCorporates,
};

function getCorporates() {
  // const requestOptions = {
  //   method: "GET",
  //   headers: authHeader(),
  // };

  // return fetch(`http://localhost:3000/corporates`, requestOptions).then(
  //   handleResponse
  // );
  return axios.get(process.env.REACT_APP_API_URL + "api/corporate_list", { headers: authHeader() });
}

function addCorporate(data) {
  // console.log(">>>>>>>>>>>>>>> register corporate", corporate);
  // const requestOptions = {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(data),
  // };

  // return fetch(`http://localhost:3001/corporates/add`, requestOptions).then(
  //   handleResponse
  // );
  return axios.post("/api/corporate_register/", data).then(handleResponse);
}
function registerCorporate(data) {
  // const requestOptions = {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(corporate)
  // };

  // return fetch(`http://192.168.2.190:8000/api/corporate_register/`, requestOptions).then(handleResponse);
  // return axios.post(
  //   process.env.REACT_APP_API_URL + "api/corporate_register/",
  //   data,
  //   {
  //     headers: {
  //       "Content-Type": "application/json;charset=UTF-8",
  //     },
  //   }
  // );
  // return axios.post(
  //   process.env.REACT_APP_API_URL + "api/corporate_register",
  //   data,
  //   {
  //     headers: {
  //       "Content-Type": "application/json;",
  //     },
  //   }
  // );
  return axios.post(process.env.REACT_APP_API_URL + "api/corporate_register/", data);
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
