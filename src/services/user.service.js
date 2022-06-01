// import config from 'config';
import { authHeader } from "../helpers";
import axios from "axios";

export const userService = {
  login,
  getDetail,
};

async function login(data) {
  return await axios.post(
      `${process.env.REACT_APP_TGP_API_URL}auth/v1/auth/login`,
      { username: data?.email, password: data?.password }
    );
}
function getDetail() {
  return axios.get(process.env.REACT_APP_TGP_API_URL + "social-org/v1/user", {headers: authHeader()});
}