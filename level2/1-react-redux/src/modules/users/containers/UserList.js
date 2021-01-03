import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { apiGetUsersAction } from "../state/getUsers/actions";
import { apiCreateUserAction } from "../state/createUser/actions";
import { apiDeleteUserAction } from "../state/deleteUser/actions";
import { apiUpdateUserAction } from "../state/updateUser/actions";

import { openUserModalAction } from "../state/userModal/actions";

import { DeleteUserStatus } from "./UserStatus";
// import UserForm from "./UserForm";
import UserForm from "../components/UserForm";
import UserModal from "./UserModal";

//------------------ AddUser ------------- [PERF-ISSUE-FIXED]

const AddUser = ({ createUser }) => {
  console.log("AddUser");
  const inputEl = useRef(null);
  const handleAddUser = (e) => {
    e.preventDefault();
    const name = inputEl.current.value;
    if (!name.trim()) return;
    createUser({ name });
    inputEl.current.value = "";
  };

  return (
    <div>
      <form onSubmit={handleAddUser}>
        <input ref={inputEl} type="text" />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

const mapDispatchToProps1 = (dispatch) => {
  return {
    createUser: (payload) => dispatch(apiCreateUserAction(payload)),
  };
};

// memoized: shallow compare and re-render
const AddUserMemozd = connect(null, mapDispatchToProps1)(React.memo(AddUser));

//------------------ UserItem ------------- [PERF-ISSUE-FIXED]

const UserItem = ({ user, deleteUser, openUserModal }) => {
  console.log("UserItem");
  return (
    <>
      <li className="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <span className="mr-2">{user.name}</span>
          <span className="badge badge-light mr-1">{user.email}</span>
          <span className="badge badge-light mr-1">{user.username}</span>
          <span className="badge badge-light mr-1">{user.sex}</span>
          <span className="badge badge-light mr-1">{user.role}</span>
        </div>
        <div>
          <a href="#" className="mr-2" onClick={() => openUserModal(user)}>
            Edit
          </a>
          <a href="#" onClick={() => deleteUser(user)}>
            Delete
          </a>
        </div>
      </li>
    </>
  );
};

const mapDispatchToProps2 = (dispatch) => {
  return {
    deleteUser: (payload) => dispatch(apiDeleteUserAction(payload)),
    openUserModal: (payload) => dispatch(openUserModalAction(payload)),
  };
};
// memoized: shallow compare and re-render
const UserItemMemozd = connect(null, mapDispatchToProps2)(React.memo(UserItem));

//------------------ Users ------------- [PERF-ISSUE-FIXED]

const Users = ({ users, toggleUser, getUsers, apiGetUsersStartAction }) => {
  console.log("Users");
  useEffect(() => {
    // apiGetUsersStartAction();
    getUsers({ pageSize: 10 });
  }, []);
  return (
    <div>
      <DeleteUserStatus />
      {users.loading && "Loading Users..."}
      {users.error && "Error when getting Users"}

      <ul class="list-group">
        {users.data &&
          users.data.map((user) => (
            <UserItemMemozd key={user.id} user={user} toggleUser={toggleUser} />
          ))}
      </ul>

      <UserModal />
    </div>
  );
};

//------------------ Redux: Selectors -------------

const getUsers = (state) => state.userState.users;

// PERFORMANCE-ISSUE-FIXED: // created: MemoizedSelector
// 'users.filter' will be called only if 'state.userState.users' changes
const getVisibleUsers = createSelector([getUsers], (users) =>
  users.filter((user) => !user.completed)
);

const mapStateToProps = (state) => ({
  users: state.userState.users,
  // users: getVisibleUsers(state)
});

const mapDispatchToProps = (dispatch) => {
  return {
    // addUser: payload => dispatch(addUserAction(payload)),
    // toggleUser: payload => dispatch(toggleUserAction(payload)),
    getUsers: (payload) => dispatch(apiGetUsersAction(payload)),
    createUser: (payload) => dispatch(apiCreateUserAction(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Users));
