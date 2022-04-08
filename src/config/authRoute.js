import { Route, Router, Switch, Redirect } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import ListCorporates from "../components/corporate/ListCorporates";
import AddCorporate from "../components/corporate/AddCorporate";
import { PrivateRoute } from "../components/PrivateRoute";
import React, { useEffect } from "react";
import { history } from "../helpers";
import CorporateSignUp from "../components/auth/CorporateSignUp";
import Header from "./../components/layouts/Header";
import Sidebar from "./../components/layouts/Sidebar";

const CreateAuthRoutes = () => {
  return (
    <Router history={history}>
      <main id="main" className="main">
        <section className="section dashboard">
          {alert.message && (
            <div className={`alert ${alert.type}`}>{alert.message}</div>
          )}
          <Header />
          <Sidebar />
          <Switch>
            <PrivateRoute exact path="/" component={ListCorporates} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/corporates" component={ListCorporates} />
            <PrivateRoute
              exact
              path="/corporates/add"
              component={AddCorporate}
            />
            <Route
              exact
              path="/corporates/sign-up"
              component={CorporateSignUp}
            />
            <Redirect from="*" to="/" />
          </Switch>
        </section>
      </main>
    </Router>
  );
};
export default CreateAuthRoutes;
