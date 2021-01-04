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
const getFilter = (state) => state.userState.filter;

// PERFORMANCE-ISSUE-FIXED: // created: MemoizedSelector
// 'users.filter' will be called only if 'state.userState.users.data' changes or 'state.userState.filter' changes
const getVisibleUsers = createSelector([getUsers, getFilter], (users, filter) =>
  users.filter((user) => {
    let searchMatched = true;
    let activeMatched = true;
    if (filter.search)
      searchMatched = user.name
        .toLowerCase()
        .startsWith(filter.search.toLowerCase());

    if (filter.active === "Active") activeMatched = user.isActive;
    if (filter.active === "InActive") activeMatched = !user.isActive;
    if (filter.active === "All") activeMatched = true;

    return searchMatched && activeMatched;
  })
);

const mapStateToProps = (state) => ({ users: getVisibleUsers(state) });
const mapDispatchToProps = { apiGetUsersAction };
export default connect(mapStateToProps, mapDispatchToProps)(UserList);
