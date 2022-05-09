import axios from 'axios';

export function jwtInterceptor() {
    console.log("sssssssssss coming interceptor")
    axios.interceptors.request.use(request => {
        // add auth header with jwt if account is logged in and request is to the api url
        const user = JSON.parse(localStorage.getItem("user"));
        const isLoggedIn = user?.token;
        // const isApiUrl = request.url.startsWith(process.env.REACT_APP_API_URL);
        console.log("3333333333333333333333 coming interceptor", isLoggedIn);
        request.headers.common['content-type'] = 'application/json';
        // request = request.clone({
        //     headers: request.headers.set('Content-type', 'application/json'),
        // });
        if (isLoggedIn) {
            request.headers.common.Authorization = `Bearer ${user?.token}`;
            // request.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')`

        }

        return request;
    });
}