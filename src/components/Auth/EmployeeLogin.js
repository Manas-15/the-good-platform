import React from "react";
import LoginForm from "./LoginForm";
import { employeeActions, userActions } from "../../actions";
import { useDispatch, useSelector } from "react-redux";

const EmployeeLogin = (props) => {
  const dispatch = useDispatch();
  const loggingIn = useSelector((state) => state.employee.loggingIn);
  const login = (values) => {
    values.email = values.email.toLowerCase();

    if (values.email && values.password) {
      if (values?.loginType === "Others") {
        dispatch(employeeActions.login(values));
        // dispatch(userActions.login(values));
      } else if (values.loginType === "Individual") {
        dispatch(employeeActions.login(values));
      } else {
        // dispatch(employeeActions.login(values));
        
      }
    }
  };

  return <LoginForm submit={(user) => login(user)} disable={loggingIn} />;
};
export default EmployeeLogin;
