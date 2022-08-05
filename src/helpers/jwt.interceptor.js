import axios from "axios";

export function jwtInterceptor() {
  axios.interceptors.request.use((request) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const isLoggedIn = user?.token;
    request.headers.common["content-type"] = "application/json";

    if (isLoggedIn) {
      request.headers.common.Authorization = `Bearer ${user?.token}`;
    } else {
      request.headers.common.Authorization = "";
    }

    return request;
  });
  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
      }
      return error;
    }
  );
}
