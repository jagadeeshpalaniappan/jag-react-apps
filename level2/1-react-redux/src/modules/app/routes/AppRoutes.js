import React, { Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { routeConfig } from "../config";

import NotFoundView from "../views/NotFound";

// import UserModule from "./modules/user";
// const UserModule = lazy(() => import("../modules/user"));

import Users1IndexView from "../../users1/views/UsersIndexView";
// import Users2IndexView from "../../users1/views/UsersIndexView";
const Users2IndexView = lazy(() => import("../../users1/views/UsersIndexView"));

const AppRoutes = () => {
  console.log("### AppRoutes:");
  return (
    <Suspense fallback={<div>Loading Modules...</div>}>
      <Switch>
        <Redirect exact from="/" to={routeConfig.user1} />
        <Route path={routeConfig.user1}>
          <Users1IndexView />
        </Route>
        <Route path={routeConfig.user2}>
          <Users2IndexView />
        </Route>
        <Route path="/404">
          <NotFoundView />
        </Route>
        <Redirect to="/404" />
      </Switch>
    </Suspense>
  );
};

export default React.memo(AppRoutes);
