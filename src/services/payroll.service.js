import { authHeader } from "../helpers";
import axios from "axios";
import { payrollConstants } from "../constants";

export const payrollService = {
  getPayrollBatch,
  processBatch,
  actionBatch,
  getBatchDetail,
  updateBatchStatus,
};
function processBatch(data) {
  return axios.post(
    process.env.REACT_APP_API_URL + "api/save_batch_process_data/",
    data
  );
}
function actionBatch(data) {
  return axios.post(
    process.env.REACT_APP_API_URL + "api/complete_batch/",
    data
  );
}
function getPayrollBatch(data) {
  return axios.get(
    process.env.REACT_APP_API_URL + "api/fetch_batch_process_data/",
    {
      params: data,
    }
  );
}
function getBatchDetail(data) {
  return axios.get(process.env.REACT_APP_API_URL + "api/fetch_batch_detail/", {
    params: data,
  });
}
function updateBatchStatus(data) {
  return axios.post(
    process.env.REACT_APP_API_URL +
      (data?.requestType === payrollConstants.PAID
        ? "api/simulate_success_open_bank/"
        : "api/update_batch_status/"),
    data
  );
}
