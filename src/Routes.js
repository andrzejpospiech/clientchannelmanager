import React from "react";
import { Route, Switch } from "react-router-dom";

import AppliedPublicRoute from "./components/AppliedPublicRoute";
import AppliedPrivateRoute from "./components/AppliedPrivateRoute";

import Home from "./containers/intro/Home";
import Login from "./containers/intro/Login";
import NotFound from "./containers/NotFound";

import Dashboard from "./containers/app/Dashboard";
import RealProperty from "./containers/app/properties/RealProperty";


export default ({ childProps }) =>
  <Switch>
    <AppliedPublicRoute path="/" exact component={Home} props={childProps} />
    <AppliedPublicRoute path="/login" exact component={Login} props={childProps} />
    
    <AppliedPrivateRoute path="/dashboard" exact component={Dashboard} props={childProps} />
    <AppliedPrivateRoute path="/dashboard/properties" exact component={RealProperty} props={childProps} />
    
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;