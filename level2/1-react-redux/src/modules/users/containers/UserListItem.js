import React from "react";
import { connect } from "react-redux";
import { apiDeleteUserAction } from "../state/deleteUser/actions";
import { openUserModalAction } from "../state/userModal/actions";

const UserListItem = ({ user, apiDeleteUserAction, openUserModalAction }) => {
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
          {user.isActive && (
            <span className="badge badge-light mr-1">active</span>
          )}
        </div>
        <div>
          <a
            href="#"
            className="mr-2"
            onClick={() => openUserModalAction(user)}
          >
            Edit
          </a>
          <a href="#" onClick={() => apiDeleteUserAction(user)}>
            Delete
          </a>
        </div>
      </li>
    </>
  );
};

const mapDispatchToProps = { apiDeleteUserAction, openUserModalAction };
export default connect(null, mapDispatchToProps)(React.memo(UserListItem));
