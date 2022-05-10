import { authHeader } from "../helpers";
import axios from "axios";

export const payrollService = {
  processBatch,
};
function processBatch(data) {
  return axios.post(process.env.REACT_APP_API_URL + "api/process_batch/", data);
}