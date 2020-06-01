import React, { Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NotFoundView from "../modules/common/views/NotFound";

// import UserModule from "./modules/user";
const UserModule = lazy(() => import("../modules/user"));
// import PostModule from "./modules/post";
const PostModule = lazy(() => import("../modules/post"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading Modules...</div>}>
      <Switch>
        <Redirect exact from="/" to="/users" />
        <Route path="/users">
          <UserModule />
        </Route>
        <Route path="/posts">
          <PostModule />
        </Route>
        <Route path="/404">
          <NotFoundView />
        </Route>
        <Redirect to="/404" />
      </Switch>
    </Suspense>
  );
};
export default AppRoutes;
