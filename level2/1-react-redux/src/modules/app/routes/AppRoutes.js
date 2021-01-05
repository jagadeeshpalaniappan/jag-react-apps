import React, { Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { routeConfig } from "../config";

import NotFoundView from "../views/NotFound";

// import UserModule from "./modules/user";
// const UserModule = lazy(() => import("../modules/user"));

import Users1IndexView from "../../users1/views/UsersIndexView";
// import Users2IndexView from "../../users1/views/UsersIndexView";
const Users2IndexView = lazy(() => import("../../users2/views/UsersIndexView"));

const AppRoutes = () => {
  console.log("### AppRoutes:");
  return (
    <Switch>
      <Redirect exact from="/" to={routeConfig.user1} />
      <Route path={routeConfig.user1}>
        <Users1IndexView />
      </Route>
      <Route path={routeConfig.user2}>
        <Suspense fallback={<div>Loading 'User2' Module...</div>}>
          <Users2IndexView />
        </Suspense>
      </Route>
      <Route path="/404">
        <NotFoundView />
      </Route>
      <Redirect to="/404" />
    </Switch>
  );
};

export default React.memo(AppRoutes);
