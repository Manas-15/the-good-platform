import {
  Route,
  BrowserRouter,
  Link,
  Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Dashboard from "../components/Dashboard/Dashboard";
import ListCharityPrograms from "../components/CharityPrograms/ListCharityPrograms";
import React, { useEffect } from "react";
import { history } from "../helpers";
import DonationPreferences from "../components/DonationPreferences/DonationPreferences";
import Header from "../components/Layouts/Header";
import Sidebar from "../components/Layouts/Sidebar";
import { alertActions } from "../actions";
import { useDispatch, useSelector } from "react-redux";

import EmployeeSignUp from "../components/Auth/EmployeeSignUp";
import EmployeeLogin from "../components/Auth/EmployeeLogin";
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
              <Route exact path="/dashboard" component={Dashboard} />
              <Redirect from="*" to="/" />
            </Switch>
          </section>
        </main>
      ) : (
        <>
            <div className="container authForm">
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
            </div>
          <div className="auth-wrapper">
            <div className="container authForm">
              <Switch>
                <Route exact path="/" component={EmployeeLogin} />
                <Route exact path="/sign-up" component={EmployeeSignUp} />                
                <Route
                  exact
                  path="/employees/sign-up"
                  component={EmployeeSignUp}
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
                <Route exact path="/otp" component={Otp} />
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
