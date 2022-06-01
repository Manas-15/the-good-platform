import React from "react";
import LoginForm from "./LoginForm";
import { employeeActions, userActions } from "./../../actions";
import { useDispatch, useSelector } from "react-redux";

const EmployeeLogin = (props) => {
  const dispatch = useDispatch();
  const loggingIn = useSelector((state) => state.employee.loggingIn);
  const login = (values) => {
    if (values.email && values.password) {
      console.log("ddddddddddddddddd user", values)
      if(values?.loginType === "Others"){
        dispatch(userActions.login(values));
      }else{
        dispatch(employeeActions.login(values));
      }
    }
  };

  return <LoginForm submit={(user) => login(user)} disable={loggingIn} />;
};
export default EmployeeLogin;
