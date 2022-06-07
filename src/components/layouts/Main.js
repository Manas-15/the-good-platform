import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ListCorporates from "../Corporate/ListCorporates";
import AddCorporate from "../Corporate/AddCorporate";

const Main = () => (
  <main id="main" className="main">
    <section className="section dashboard">
      <Switch>
        {/* <Route exact path="/corporates" component={ListCorporates} />
        <Route exact path="/corporates/add" component={AddCorporate} /> */}
      </Switch>
    </section>
  </main>
);
export default Main;
