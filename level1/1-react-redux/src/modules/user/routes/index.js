import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import UsersView from "../views/Users";
import CreateUserView from "../views/CreateUser";
import EditUserView from "../views/EditUser";
import UserDetailsView from "../views/UserDetails";

export const basePath = "/users";

const UserRoutes = () => {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        <UsersView />
      </Route>
      <Route path={`${path}/create`}>
        <CreateUserView />
      </Route>
      <Route path={`${path}/edit/:id`}>
        <EditUserView />
      </Route>
      <Route path={`${path}/:id`}>
        <UserDetailsView />
      </Route>
    </Switch>
  );
};

export default UserRoutes;
