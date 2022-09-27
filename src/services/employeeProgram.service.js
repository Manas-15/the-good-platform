import axios from "axios";

export const employeeProgramService = {
  getApprovedProgram
};

async function getApprovedProgram(data) {
  return await axios.get(
    process.env.REACT_APP_API_URL + "api/employeeProgramInfo/",
    {
      params: data
    }
  );
}
