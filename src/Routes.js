import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import { RouteWithLayout } from "./components";
import { Main as MainLayout, Minimal as MinimalLayout } from "./layouts";

import {
  Dashboard as DashboardView,
  Products as ProductsView,
  Category as CategoryView,
  UserList as UserListView,
  Account as AccountView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView,
} from "./views";

const Routes = () => {
  return (
    <Switch>
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <RouteWithLayout
        component={UserListView}
        exact
        layout={MainLayout}
        path="/users"
      />
      <RouteWithLayout
        component={ProductsView}
        exact
        layout={MainLayout}
        path="/products"
      />
      <RouteWithLayout
        component={CategoryView}
        exact
        layout={MainLayout}
        path="/category"
      />
      <RouteWithLayout
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
      />
      <RouteWithLayout
        component={SettingsView}
        exact
        layout={MainLayout}
        path="/settings"
      />
      <Route
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />
      <Route
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/dashboard" />
    </Switch>
  );
};

export default Routes;
