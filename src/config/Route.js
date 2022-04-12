import {
  Route,
  BrowserRouter,
  Link,
  Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Dashboard from "../components/Dashboard";
import ListCorporates from "../components/corporate/ListCorporates";
import ListCharityPrograms from "../components/charityPrograms/ListCharityPrograms";
import ListEmployees from "../components/employee/ListEmployees";
import SocialOrganizations from "../components/socialOrganizations/ListSocialOrganizations";
import AddCorporate from "../components/corporate/AddCorporate";
import { PrivateRoute } from "../components/PrivateRoute";
import React, { useEffect } from "react";
import { history } from "../helpers";
import CorporateSignUp from "../components/auth/CorporateSignUp";
import Header from "../components/layouts/Header";
import Sidebar from "../components/layouts/Sidebar";
import { alertActions } from "../actions";
import { useDispatch, useSelector } from "react-redux";

import SignUp from "../components/auth/SignUp";
import CorporateLogin from "../components/auth/CorporateLogin";
import EmployeeSignUp from "../components/auth/EmployeeSignUp";
import SuperAdminLogin from "../components/auth/SuperAdminLogin";
import Otp from "../components/auth/Otp";
import ForgotPassword from "../components/auth/ForgotPassword";

const CreateRoutes = () => {
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();
  useEffect(() => {
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }, []);
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <BrowserRouter history={history}>
      {user ? (
        <main id="main" className="main">
          <section className="section dashboard">
            {alert.message && (
              <div className={`alert ${alert.type}`}>{alert.message}</div>
            )}
            <Header />
            <Sidebar />
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/corporates" component={ListCorporates} />
              <Route exact path="/corporates/add" component={AddCorporate} />
              <Route
                exact
                path="/corporates/sign-up"
                component={CorporateSignUp}
              />
              <Route
                exact
                path="/charity-programs"
                component={ListCharityPrograms}
              />
              <Route exact path="/employees" component={ListEmployees} />
              <Route
                exact
                path="/social-organizations"
                component={SocialOrganizations}
              />
              <Redirect from="*" to="/" />
            </Switch>
          </section>
        </main>
      ) : (
        <>
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
                <Route exact path="/sign-up" component={CorporateSignUp} />
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
                <Route
                  exact
                  path="/employees/sign-up"
                  component={EmployeeSignUp}
                />
                <Route
                  exact
                  path="/superadmin/sign-in"
                  component={SuperAdminLogin}
                />
                <Route
                  exact
                  path="/forgot-password"
                  component={ForgotPassword}
                />
                <Route exact path="/superadmin/otp" component={Otp} />
                <Redirect from="*" to="/" />
              </Switch>
            </div>
          </div>
        </>
      )}
    </BrowserRouter>
  );
};
export default CreateRoutes;
