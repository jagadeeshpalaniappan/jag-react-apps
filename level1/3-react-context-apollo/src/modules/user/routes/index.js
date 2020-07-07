import React from "react";
import { Route, Switch } from "react-router-dom";
import { basePath } from "../../../app/AppRoutes";
import CreateUserView from "../views/CreateUser";
import EditUserView from "../views/EditUser";
import UserDetailsView from "../views/UserDetails";
import UsersView from "../views/Users";

const UserRoutes = () => {
  return (
    <Switch>
      <Route exact path={basePath.user}>
        <UsersView />
      </Route>
      <Route path={`${basePath.user}/create`}>
        <CreateUserView />
      </Route>
      <Route path={`${basePath.user}/edit/:id`}>
        <EditUserView />
      </Route>
      <Route path={`${basePath.user}/:id`}>
        <UserDetailsView />
      </Route>
    </Switch>
  );
};

export default UserRoutes;
