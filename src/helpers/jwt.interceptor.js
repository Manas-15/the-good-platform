import axios from "axios";

export function jwtInterceptor() {
  console.log("sssssssssss coming interceptor");
  axios.interceptors.request.use((request) => {
    // add auth header with jwt if account is logged in and request is to the api url
    const user = JSON.parse(localStorage.getItem("user"));
    const isLoggedIn = user?.token;
    // const isApiUrl = request.url.startsWith(process.env.REACT_APP_API_URL);
    console.log("3333333333333333333333 coming interceptor", isLoggedIn);
    request.headers.common["content-type"] = "application/json";
    // request = request.clone({
    //     headers: request.headers.set('Content-type', 'application/json'),
    // });
    if (isLoggedIn) {
      console.log("isLoggedIn coming interceptor", isLoggedIn);
      request.headers.common.Authorization = `Bearer ${user?.token}`;
      // request.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')`
    } else {
      console.log("isLoggedIn else coming interceptor", isLoggedIn);
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
        console.log("eeeeeeeeeeeeee axios", error);
      }
      return error;
    }
  );
}
