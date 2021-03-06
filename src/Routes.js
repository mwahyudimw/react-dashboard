import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import { RouteWithLayout } from "./components";
import { Main as MainLayout, Minimal as MinimalLayout } from "./layouts";

import {
  Dashboard as DashboardView,
  Products as ProductsView,
  Category as CategoryView,
  UserList as UserListView,
  Transaction as TransactionView,
  Account as AccountView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  Article as ArticleView,
  Galeri as GaleriView,
  HubungiKami as HubungiKamiView,
  Pengiriman as PengirimanView,
  TentangKami as TentangKamiView,
  Testimonials as TestimonialsView,
  ResetPass,
  VerifyEmail,
} from "./views";

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/dashboard" />
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
        component={TransactionView}
        exact
        layout={MainLayout}
        path="/transaction"
      />
      <RouteWithLayout
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
      />
      <RouteWithLayout
        component={ArticleView}
        exact
        layout={MainLayout}
        path="/article"
      />
      <RouteWithLayout
        component={GaleriView}
        exact
        layout={MainLayout}
        path="/galery"
      />
      <RouteWithLayout
        component={HubungiKamiView}
        exact
        layout={MainLayout}
        path="/contact-us"
      />
      <RouteWithLayout
        component={PengirimanView}
        exact
        layout={MainLayout}
        path="/delivery"
      />
      <RouteWithLayout
        component={TentangKamiView}
        exact
        layout={MainLayout}
        path="/about-us"
      />
      <RouteWithLayout
        component={TestimonialsView}
        exact
        layout={MainLayout}
        path="/testimonials"
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
      <Route
        component={VerifyEmail}
        exact
        layout={MinimalLayout}
        path="/verify-email"
      />
      <Route
        component={ResetPass}
        exact
        layout={MinimalLayout}
        path="/reset-pass/:id"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
