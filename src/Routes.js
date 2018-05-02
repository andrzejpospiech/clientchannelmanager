import React from "react";
import { Route, Switch } from "react-router-dom";

import AppliedPublicRoute from "./components/AppliedPublicRoute";
import AppliedPrivateRoute from "./components/AppliedPrivateRoute";

import Home from "./containers/Home";
import Login from "./containers/Login";
import NotFound from "./containers/NotFound";

import Main from "./containers/Main";


export default ({ childProps }) =>
  <Switch>
    <AppliedPublicRoute path="/" exact component={Home} props={childProps} />
    <AppliedPublicRoute path="/login" exact component={Login} props={childProps} />
    
    <AppliedPrivateRoute path="/main" exact component={Main} props={childProps} />
    
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;