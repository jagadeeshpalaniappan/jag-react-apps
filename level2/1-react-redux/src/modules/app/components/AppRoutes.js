import React, { Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NotFoundView from "../views/NotFound";

// import UserModule from "./modules/user";
// const UserModule = lazy(() => import("../modules/user"));
// import PostModule from "./modules/post";
// const PostModule = lazy(() => import("../modules/post"));

import UsersIndexView from "../../../modules/users/views/UsersIndexView";

export const basePath = {
  user: "/users",
  post: "/posts",
  todo: "/todos",
};

const AppRoutes = () => {
  console.log("### AppRoutes:");
  return (
    <Suspense fallback={<div>Loading Modules...</div>}>
      <Switch>
        <Redirect exact from="/" to={basePath.user} />
        <Route path={basePath.user}>
          <UsersIndexView />
        </Route>
        {/* <Route path={basePath.post}>
          <PostModule />
        </Route> */}
        <Route path={basePath.todo}>...</Route>
        <Route path="/404">
          <NotFoundView />
        </Route>
        <Redirect to="/404" />
      </Switch>
    </Suspense>
  );
};

export default React.memo(AppRoutes);