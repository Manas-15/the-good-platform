import React, { useState } from 'react';
import LoginForm from './LoginForm';
import { userActions } from "./../../actions";
import { useDispatch } from "react-redux";

const CorporateLogin = (props) => {
  const dispatch = useDispatch();
  const [disable, setDisable] = useState(false);

  const validateOtp = (values) => {
    console.log("login corporate here ...........", values)   
    // const navigate = useNavigate();    
    if (values.email && values.password) {
      console.log("create coming corporate", values);
      dispatch(userActions.login(values));
    }
  }
  
  return (
    <LoginForm 
      submit={(user) => validateOtp(user)}
      disable={disable}
      userType={2}
    />
  )
}
export default CorporateLogin;