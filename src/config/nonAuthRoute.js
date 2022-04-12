import { Route, Router, Switch, Redirect } from "react-router-dom";
import SignUp from "../components/auth/SignUp";
import CorporateSignUp from "../components/auth/CorporateSignUp";
import CorporateLogin from "../components/auth/CorporateLogin";
import EmployeeSignUp from "../components/auth/EmployeeSignUp";
import SuperAdminLogin from "../components/auth/SuperAdminLogin";
import Otp from "../components/auth/Otp";
import ForgotPassword from "../components/auth/ForgotPassword";
import React, { useEffect } from "react";
import { history } from "../helpers";
import { BrowserRouter, Link } from "react-router-dom";
import { alertActions } from "./../actions";
import { useDispatch, useSelector } from "react-redux";

const CreateNonAuthRoutes = () => {
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }, []);
  return (
    <BrowserRouter history={history}>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          {alert.message && (
            <div className={`alert ${alert.type}`}>{alert.message}</div>
          )}
          <Link className="navbar-brand" to={"/sign-in"}>
            <img
              src="/assets/img/logo.png"
              alt="The Good Platform Logo"
              height={35}
              style={{ float: "left" }}
            />
            <h4 className="mb-0 logo-style">The Good Platform</h4>
          </Link>
        </div>
      </nav>
      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path="/" component={CorporateLogin} />
            <Route exact path="/sign-up" component={SignUp} />
            <Route
              exact
              path="/corporates/sign-up"
              component={CorporateSignUp}
            />
            <Route
              exact
              path="/corporates/sign-in"
              component={CorporateLogin}
            />
            <Route exact path="/employees/sign-up" component={EmployeeSignUp} />
            <Route
              exact
              path="/superadmin/sign-in"
              component={SuperAdminLogin}
            />
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Route exact path="/superadmin/otp" component={Otp} />
            <Redirect from="*" to="/" />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};
export default CreateNonAuthRoutes;
