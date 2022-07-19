// import config from 'config';
import { authHeader } from "../helpers";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { createLogger } from "redux-logger";

export const transactionsHistoryService = {
  getDirectPayment,
  getTransactionsHistory,
  download80G,
  send80GEmail,
};

function getTransactionsHistory(data) {
  // return axios.get(process.env.REACT_APP_API_URL + "api/corporate_list", { headers: authHeader() });
  return axios.get(process.env.REACT_APP_API_URL + "api/transaction_history/", {
    params: data,
  });
}
function getDirectPayment(data) {
  // return axios.get(process.env.REACT_APP_API_URL + "api/corporate_list", { headers: });
  return axios.get(process.env.REACT_APP_API_URL + "api/directPayment/", {
    params: data,
  });
}
function download80G(data) {
  // return axios.get(process.env.REACT_APP_API_URL + "api/corporate_list", { headers: authHeader() });
  return axios.get(process.env.REACT_APP_API_URL + "api/download_file/", {
    params: data,
    headers: {
      "Content-Type": "application/pdf",
    },
  });
}
function send80GEmail(data) {
  // return axios.corporate_list", { headers: authHeader() });
  return axios.get(process.env.REACT_APP_API_URL + "api/send_80G_email/",
  data
)
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
