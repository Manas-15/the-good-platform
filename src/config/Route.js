import {
  Route,
  Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Dashboard from "../components/Dashboard/Dashboard";
import CharityPrograms from "../components/CharityPrograms/CharityPrograms";
import React, { useEffect } from "react";
import { history } from "../helpers";
import DonationPreferences from "../components/DonationPreferences/DonationPreferences";
import Header from "../components/Layouts/Header";
import Sidebar from "../components/Layouts/Sidebar";
import { alertActions } from "../actions";
import { useDispatch, useSelector } from "react-redux";

import EmployeeSignUp from "../components/Auth/EmployeeSignUp";
import EmployeeLogin from "../components/Auth/EmployeeLogin";
// import ListCorporates from "../components/Corporate/ListCorporates";
import CorporatesPortal from "../components/Corporate/CorporatesPortal";
import ListEmployees from "../components/Employee/ListEmployees";
import ListTransactionsHistory from "../components/TransactionsHistory/ListTransactionsHistory";
import Otp from "../components/Auth/Otp";
import ForgotPassword from "../components/Auth/ForgotPassword";
import SetPassword from "../components/Auth/SetPassword";
import ThankYou from "../components/Auth/ThankYou";
import Profile from "../components/Profile/Profile";

const CreateRoutes = () => {
  const alert = useSelector((state) => state.alert);
  // const user = useSelector((state) => state.employee.user);
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
  const isCorporateLunchpad = history.location.pathname == "/corporates"
  const isEmployeeView = history.location.pathname.includes("/employees")
  if(isCorporateLunchpad){
    document.body.classList.add("toggle-sidebar");
  }
  if(isEmployeeView){
    document.body.classList.remove("toggle-sidebar");
  }
  // const user = JSON.parse(localStorage.getItem("user"));
  const user = useSelector((state) => state.employee.user);
  const otpVerified =JSON.parse(localStorage.getItem("otpVerified"));
  return (
    <Router history={history}>
       {/* &&  otpVerified */}
      {user?.token &&  otpVerified ? (
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
            {!isCorporateLunchpad && <Header />}
            {!isCorporateLunchpad && <Sidebar />}
            <Switch>
              {!isEmployeeView && <Route exact path="/" component={Dashboard} />}
              <Route exact path="/profile" component={Profile} />
              {!isEmployeeView && <Route
                exact
                path="/charity-programs"
                component={CharityPrograms}
              />}
              {!isEmployeeView && <Route
                exact
                path="/donation-preferences"
                component={DonationPreferences}
              />}
              <Route
                exact
                path="/corporates"
                component={CorporatesPortal}
              />
              <Route
                exact
                path="/corporates/:corporateId/employees"
                component={ListEmployees}
              />
              <Route
                exact
                path="/transactions-history"
                component={ListTransactionsHistory}
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
                <Route exact path="/thank-you" component={ThankYou} />
                <Route exact path="/set-password/:id" component={SetPassword} />
                {user && !otpVerified && <Route exact path="/otp" component={Otp} />}
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
