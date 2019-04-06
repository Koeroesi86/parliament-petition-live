import { Route } from "react-router";
import IndexPage from "../index-page/IndexPage";
import React from "react";

const Routes = () => (
  <Route path="/" component={IndexPage}>
    <Route path="index.html" component={IndexPage} exact/>
  </Route>
);

export default Routes;
