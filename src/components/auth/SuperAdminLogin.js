import React, { useState } from "react";
import LoginForm from "./LoginForm";
import { useHistory } from "react-router-dom";
import { userActions } from "./../../actions";
import { useDispatch } from "react-redux";

const SuperAdminLogin = (props) => {
  const [disable, setDisable] = useState(false);
  const dispatch = useDispatch();
  let history = useHistory();

  const login = (values) => {
    console.log("create coming here ...........", values);
    // const navigate = useNavigate();
    if (values.email && values.password) {
      dispatch(userActions.login(values));
    }
  };

  return (
    <LoginForm submit={(user) => login(user)} disable={disable} />
  );
};
export default SuperAdminLogin;
