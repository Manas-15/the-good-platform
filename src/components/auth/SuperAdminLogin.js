import React, { useState } from 'react';
import LoginForm from './LoginForm';
import { useHistory } from 'react-router-dom';

const SuperAdminLogin = (props) => {
  const [disable, setDisable] = useState(false);  
  let history = useHistory();

  const validateOtp = (values) => {
    console.log("create coming here ...........", values)   
    // const navigate = useNavigate();
    history.push("/superadmin/otp")
    // navigate("/")
    // const history = useNavigate();
    // history("/otp");
    // axios({
    //   'url': API.login,
    //   'headers': {
    //       'content-type':'application/octet-stream',
    //       'x-rapidapi-host':'example.com',
    //       // 'x-rapidapi-key': process.env.RAPIDAPI_KEY
    //   },
    //   'params': {
    //       'search':'parameter',
    //   },
    // })
  }
  
  return (
    <LoginForm 
      submit={(user) => validateOtp(user)}
      disable={disable}
      type={'superadmin'}
    />
  )
}
export default SuperAdminLogin;