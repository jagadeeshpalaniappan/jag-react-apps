import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import UserListItem from "./UserListItem";
import { UserListStatus } from "./UserStatus";
import { apiGetUsersAction } from "../state/getUsers/actions";

export const UserList = ({ users, apiGetUsersAction }) => {
  console.log("UserList");
  useEffect(() => {
    apiGetUsersAction();
  }, []);
  return (
    <>
      <UserListStatus />
      <ul class="list-group">
        {users &&
          users.map((user) => <UserListItem key={user.id} user={user} />)}
      </ul>
    </>
  );
};

const getUsers = (state) => state.userState.users.data;
const getVisibilityFilter = (state) => state.userState.visibilityFilter;

// PERFORMANCE-ISSUE-FIXED: // created: MemoizedSelector
// 'users.filter' will be called only if 'state.userState.users.data' changes or 'state.userState.visibilityFilter' changes
const getVisibleUsers = createSelector(
  [getUsers, getVisibilityFilter],
  (users, visibilityFilter) =>
    users.filter((user) => {
      if (visibilityFilter === "Active") return user.isActive;
      if (visibilityFilter === "InActive") return !user.isActive;
      if (visibilityFilter === "All") return true;
    })
);

const mapStateToProps = (state) => ({ users: getVisibleUsers(state) });
const mapDispatchToProps = { apiGetUsersAction };
export default connect(mapStateToProps, mapDispatchToProps)(UserList);
