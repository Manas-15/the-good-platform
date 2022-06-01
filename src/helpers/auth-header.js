export function authHeader() {
  // return authorization header with jwt token
  let user = JSON.parse(localStorage.getItem("user"));
  let accessToken = JSON.parse(localStorage.getItem("accessToken"));
  console.log("dddddddddddddddd accessToken?.access_token", accessToken)
  if (user && user?.token) {
    return { Authorization: "Bearer " + user?.token?.access };
  }else if(accessToken && accessToken?.access_token){
    console.log("ddddddddd accessToken?.access_token", accessToken?.access_token)
    return { Authorization: "Bearer " + accessToken?.access_token };
  }else {
    return {};
  }
}
