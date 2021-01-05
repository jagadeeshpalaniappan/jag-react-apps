import React, { Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { routeConfig } from "../config";

import NotFoundView from "../views/NotFound";

// import UserModule from "./modules/user";
// const UserModule = lazy(() => import("../modules/user"));

import Users1IndexView from "../../users/views/UsersIndexView";
// import PostsIndexView from "../../post/views/PostsIndexView";
const PostsIndexView = lazy(() => import("../../post/views/PostsIndexView"));

const AppRoutes = () => {
  console.log("### AppRoutes:");
  return (
    <Switch>
      <Redirect exact from="/" to={routeConfig.user} />
      <Route path={routeConfig.user}>
        <Users1IndexView />
      </Route>
      <Route path={routeConfig.post}>
        <Suspense fallback={<div>Loading 'Post' Module...</div>}>
          <PostsIndexView />
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
