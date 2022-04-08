import { Route, Router, Switch, Redirect} from 'react-router-dom';
import SignUp from "../components/auth/SignUp";
import CorporateSignUp from "../components/auth/CorporateSignUp";
import EmployeeSignUp from "../components/auth/EmployeeSignUp";
import SuperAdminLogin from "../components/auth/SuperAdminLogin";
import Otp from "../components/auth/Otp";
import ForgotPassword from '../components/auth/ForgotPassword';
import React, { useEffect } from 'react';
import { history } from '../helpers';

const CreateNonAuthRoutes = () => {
  return(<Router history={history}>
    <Switch>
      <Route exact path="/" component={SuperAdminLogin} />
      <Route exact path="/sign-up" component={SignUp} />
      <Route exact path="/corporates/sign-up" component={CorporateSignUp} />
      <Route exact path="/employees/sign-up" component={EmployeeSignUp} />
      <Route exact path="/superadmin/sign-in" component={SuperAdminLogin} />
      <Route exact path="/forgot-password" component={ForgotPassword} />
      <Route exact path="/superadmin/otp" component={Otp} />
      <Redirect from="*" to="/" />
    </Switch>
  </Router>)
}
export default CreateNonAuthRoutes;