import React from "react";
import { Route, Switch } from "react-router-dom";

import AppliedPublicRoute from "./components/AppliedPublicRoute";
import AppliedPrivateRoute from "./components/AppliedPrivateRoute";

import Home from "./containers/intro/Home";
import Login from "./containers/intro/Login";
import NotFound from "./containers/NotFound";

import Dashboard from "./containers/app/Dashboard";
import RealPropertyBase from "./containers/app/properties/RealPropertyBase";
import RealPropertyPortfolio from "./containers/app/properties/RealPropertyPortfolio";
import RealProperty from "./containers/app/properties/RealProperty";
import RealPropertyPortfolioNew from "./containers/app/properties/RealPropertyPortfolioNew";
import RealPropertyNew from "./containers/app/properties/RealPropertyNew";


export default ({ childProps }) =>
  <Switch>
    <AppliedPublicRoute path="/" exact component={Home} props={childProps} />
    <AppliedPublicRoute path="/login" exact component={Login} props={childProps} />
    
    <AppliedPrivateRoute path="/dashboard" exact component={Dashboard} props={childProps} />
    <AppliedPrivateRoute path="/dashboard/properties" exact component={RealPropertyBase} props={childProps} />
    <AppliedPrivateRoute path="/dashboard/properties/newPortfolio" exact component={RealPropertyPortfolioNew} props={childProps} />
    <AppliedPrivateRoute path="/dashboard/properties/newProperty" exact component={RealPropertyNew} props={childProps} />
    
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;