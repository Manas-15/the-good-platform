import React, { useState } from 'react';
import LoginForm from './LoginForm';
import { userActions } from "./../../actions";
import { useDispatch } from "react-redux";

const CorporateLogin = (props) => {
  const dispatch = useDispatch();
  const [disable, setDisable] = useState(false);

  const login = (values) => {
    console.log("login corporate here ...........", values)   
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
  }
  
  return (
    <LoginForm 
      submit={(user) => login(user)}
      disable={disable}
    />
  )
}
export default CorporateLogin;