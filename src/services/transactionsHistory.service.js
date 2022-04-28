// import config from 'config';
import { authHeader } from "../helpers";
import { useLocation } from "react-router-dom";
import axios from "axios";

export const transactionsHistoryService = {
  getTransactionsHistory,
};

function getTransactionsHistory() {
  // return axios.get(process.env.REACT_APP_API_URL + "api/corporate_list", { headers: authHeader() });
  return axios.get(process.env.REACT_APP_API_URL + "api/transactions_history/");
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
