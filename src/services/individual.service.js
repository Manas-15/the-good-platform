// import config from 'config';
import { authHeader } from "../helpers";
import { useLocation } from "react-router-dom";
import axios from "axios";

export const individualService = {
  getIndividuals,
};

function getIndividuals() {
  return axios.get(process.env.REACT_APP_API_URL + "api/individualList");
}