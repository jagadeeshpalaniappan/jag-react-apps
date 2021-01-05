import React from "react";
import Page from "src/modules/app/components/Page";
import UserList from "../components/UserList";
import UserModal from "../components/UserModal";
import { DeleteUserStatus } from "../components/UserStatus";
import UserToolbar from "../components/UserToolbar";

const UsersIndexView = () => {
  console.log("UsersIndexView");
  return (
    <Page className="container" title="Users">
      <h3 className="mt-3">Users1: </h3>
      <UserToolbar />
      <DeleteUserStatus />
      <UserList />
      <UserModal />
    </Page>
  );
};

export default UsersIndexView;
