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
      let searchMatched = true;
      let activeMatched = true;
      if (visibilityFilter.search)
        searchMatched = user.name
          .toLowerCase()
          .startsWith(visibilityFilter.search.toLowerCase());

      if (visibilityFilter.active === "Active") activeMatched = user.isActive;
      if (visibilityFilter.active === "InActive")
        activeMatched = !user.isActive;
      if (visibilityFilter.active === "All") activeMatched = true;

      return searchMatched && activeMatched;
    })
);

const mapStateToProps = (state) => ({ users: getVisibleUsers(state) });
const mapDispatchToProps = { apiGetUsersAction };
export default connect(mapStateToProps, mapDispatchToProps)(UserList);
