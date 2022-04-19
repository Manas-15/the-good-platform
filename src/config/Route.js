import {
  Route,
  BrowserRouter,
  Link,
  Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Dashboard from "../components/Dashboard/Dashboard";
import ListCorporates from "../components/Corporate/ListCorporates";
import ListCharityPrograms from "../components/CharityPrograms/ListCharityPrograms";
import ListEmployees from "../components/Employee/ListEmployees";
import SocialOrganizations from "../components/SocialOrganizations/ListSocialOrganizations";
import AddCorporate from "../components/Corporate/AddCorporate";
import AddEmployee from "../components/Employee/AddEmployee";
import React, { useEffect } from "react";
import { history } from "../helpers";
import CorporateSignUp from "../components/Auth/CorporateSignUp";
import DonationPreferences from "../components/DonationPreferences/DonationPreferences";
import Header from "../components/Layouts/Header";
import Sidebar from "../components/Layouts/Sidebar";
import { alertActions } from "../actions";
import { useDispatch, useSelector } from "react-redux";

import SignUp from "../components/Auth/SignUp";
import CorporateLogin from "../components/Auth/CorporateLogin";
import EmployeeSignUp from "../components/Auth/EmployeeSignUp";
import SuperAdminLogin from "../components/Auth/SuperAdminLogin";
import Otp from "../components/Auth/Otp";
import ForgotPassword from "../components/Auth/ForgotPassword";
import SetPassword from "../components/Auth/SetPassword";
import ThankYou from "../components/Auth/ThankYou";
import Profile from "../components/Profile/Profile";

const CreateRoutes = () => {
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();
  useEffect(() => {
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }, []);
  if (alert.message) {
    setTimeout(() => {
      dispatch(alertActions.clear());
    }, 8000);
  }
  // const user = useSelector((state) => state.authentication.user);
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <Router history={history}>
      {user?.token ? (
        <main id="main" className="main">
          <section className="section dashboard">
            {alert.message && (
              <div
                className={`alert ${alert.type} alert-dismissible`}
                role="alert"
              >
                {alert.message}
                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            )}
            <Header />
            <Sidebar />
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/profile" component={Profile} />
              {/* {user?.user_type === 1 && (
                <Route exact path="/corporates" component={ListCorporates} />
              )}
              {user?.user_type === 1 && (
                <Route exact path="/corporates/add" component={AddCorporate} />
              )} */}
              <Route
                exact
                path="/charity-programs"
                component={ListCharityPrograms}
              />
              <Route
                exact
                path="/donation-preferences"
                component={DonationPreferences}
              />
              {/* {user?.user_type === 1 && (
                <Route
                  exact
                  path="/social-organizations"
                  component={SocialOrganizations}
                />
              )}
              {user?.user_type === 2 && (
                <Route exact path="/employees" component={ListEmployees} />
              )}
              {user?.user_type === 2 && (
                <Route path="/employees/add" component={AddEmployee} />
              )} */}
              <Route exact path="/dashboard" component={Dashboard} />
              <Route
                exact
                path="/corporates/sign-up"
                component={EmployeeSignUp}
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
                <div
                  className={`alert ${alert.type} alert-dismissible`}
                  role="alert"
                >
                  {alert.message}
                  <button
                    type="button"
                    className="close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
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
                <Route exact path="/sign-up" component={EmployeeSignUp} />
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
                <Route
                  exact
                  path="/thank-you"
                  component={ThankYou}
                />
                <Route
                  exact
                  path="/set-password"
                  component={SetPassword}
                />
                <Route exact path="/superadmin/otp" component={Otp} />
                <Redirect from="*" to="/" />
              </Switch>
            </div>
          </div>
        </>
      )}
    </Router>
  );
};
export default CreateRoutes;
