import { Route, BrowserRouter, Router, Switch, Redirect } from "react-router-dom";
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
import Header from "./../components/layouts/Header";
import Sidebar from "./../components/layouts/Sidebar";
import { alertActions } from "./../actions";
import { useDispatch, useSelector } from "react-redux";

const CreateAuthRoutes = () => {
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
            <Route
              exact
              path="/corporates/add"
              component={AddCorporate}
            />
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
            <Route
              exact
              path="/employees"
              component={ListEmployees}
            />
            <Route
              exact
              path="/social-organizations"
              component={SocialOrganizations}
            />
            <Redirect from="*" to="/" />
          </Switch>
        </section>
      </main>
    </BrowserRouter>
  );
};
export default CreateAuthRoutes;
