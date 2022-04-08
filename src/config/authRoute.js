import { Route, Router, Switch, Redirect} from 'react-router-dom';
import Dashboard from "../components/Dashboard";
import ListCorporates from "../components/corporate/ListCorporates";
import AddCorporate from "../components/corporate/AddCorporate";
import { PrivateRoute } from '../components/PrivateRoute';
import React, { useEffect } from 'react';
import { history } from '../helpers';
import CorporateSignUp from "../components/auth/CorporateSignUp";

const CreateAuthRoutes = () => {
  return(<Router history={history}>
    <Switch>
      <PrivateRoute exact path="/" component={ListCorporates} />        
      <PrivateRoute exact path="/dashboard" component={Dashboard} />     
      <PrivateRoute exact path="/corporates" component={ListCorporates} />
      <PrivateRoute exact path="/corporates/add" component={AddCorporate} />
      <Route exact path="/corporates/add" component={CorporateSignUp} />
      <Redirect from="*" to="/" />
    </Switch>
  </Router>)
}
export default CreateAuthRoutes;