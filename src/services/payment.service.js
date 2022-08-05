import { authHeader } from "../helpers";
import { useLocation } from "react-router-dom";
import axios from "axios";

export const paymentService = {
  getOrderToken,
  getPaymentStatus,
  savePaymentFailureData,
};

function getOrderToken(data) {
  // return axios.get(process.env.REACT_APP_API_URL + "api/get_order_token", { headers: authHeader() });
  return axios.post(
    process.env.REACT_APP_API_URL + "api/get_order_token/",
    data
  );
}
function getPaymentStatus(orderId) {
  // return axios.get(process.env.REACT_APP_API_URL + "api/get_order_token", { headers: authHeader() });
  return axios.get(
    `${process.env.REACT_APP_CASHFREE_API_URL}pg/orders/${orderId}`,
    {
      headers: {
        "Content-Type": "application/json",
        "x-client-id": `${process.env.REACT_APP_CASHFREE_CLIENT_ID}`,
        "x-client-secret": `${process.env.REACT_APP_CASHFREE_CLIENT_SECRET}`,
        "x-api-version": "2022-01-01",
      },
    }
  );
}
function savePaymentFailureData(data) {
  // return axios.get(process.env.REACT_APP_API_URL + "api/get_order_token", { headers: authHeader() });
  return axios.post(
    `${process.env.REACT_APP_API_URL}api/payment_failure/`,
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
