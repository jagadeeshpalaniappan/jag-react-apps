import React from "react";
import Page from "src/modules/app/components/Page";
import UserList from "../containers/UserList";
import UserModal from "../containers/UserModal";
import { DeleteUserStatus } from "../containers/UserStatus";
import UserToolbar from "../containers/UserToolbar";

const UsersIndexView = () => {
  console.log("UsersIndexView");
  return (
    <Page className="container" title="Users">
      <h3 className="mt-3">Users: </h3>
      <UserToolbar />
      <DeleteUserStatus />
      <UserList />
      <UserModal />
    </Page>
  );
};

export default UsersIndexView;
