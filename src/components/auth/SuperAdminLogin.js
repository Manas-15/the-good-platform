import React from "react";
import LoginForm from "./LoginForm";
import { userActions } from "./../../actions";
import { useDispatch, useSelector } from "react-redux";

const SuperAdminLogin = (props) => {
  const loggingIn = useSelector((state) => state.users.loggingIn);
  const dispatch = useDispatch();

  const login = (values) => {
    if (values.email && values.password) {
      dispatch(userActions.login(values));
    }
  };

  return <LoginForm submit={(user) => login(user)} disable={loggingIn} />;
};
export default SuperAdminLogin;
