import React, { useState } from "react";
import LoginForm from "./LoginForm";
import { userActions } from "./../../actions";
import { useDispatch, useSelector } from "react-redux";

const CorporateLogin = (props) => {
  const dispatch = useDispatch();
  const loggingIn = useSelector((state) => state.users.loggingIn);
  const login = (values) => {
    // localStorage.setItem(
    //   "user",
    //   JSON.stringify({
    //     firstName: "Ansuman",
    //     lastName: "Ansuman",
    //     username: "Ansuman",
    //     password: "test1234",
    //     token: "fake-jwt-token",
    //   })
    // );
    // const navigate = useNavigate();
    if (values.email && values.password) {
      console.log("create coming corporate", values);
      dispatch(userActions.login(values));
    }
  };

  return <LoginForm submit={(user) => login(user)} disable={loggingIn} />;
};
export default CorporateLogin;
