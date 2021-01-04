import React from "react";
import Page from "src/modules/app/components/Page";
import AddUser from "../containers/AddUser";
import { DeleteUserStatus } from "../containers/UserStatus";
import UserList from "../containers/UserList";
import UserModal from "../containers/UserModal";
import VisibilityDropDown from "../containers/VisibilityFilterDropDown";

const UsersIndexView = () => {
  console.log("UsersIndexView");
  return (
    <Page className="container" title="Users">
      <h3 className="mt-3">Users: </h3>
      <div className="d-flex justify-content-end my-2">
        <AddUser />
        <VisibilityDropDown />
      </div>
      <DeleteUserStatus />
      <UserList />
      <UserModal />
    </Page>
  );
};

export default UsersIndexView;
