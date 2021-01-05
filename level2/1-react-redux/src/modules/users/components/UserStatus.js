import React, { useState } from "react";
import { connect } from "react-redux";

import { resetCreateUserStatusAction } from "../state/createUser/actions";
import { resetDeleteUserStatusAction } from "../state/deleteUser/actions";
import { resetUpdateUserStatusAction } from "../state/updateUser/actions";

const StatusMsg = ({ children, success, error, onClose }) => {
  let status = "alert-primary";
  if (success) status = "alert-success";
  if (error) status = "alert-danger";

  return (
    <div className={`alert alert-dismissible fade show ${status}`} role="alert">
      {children}
      {(success || error) && (
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
          onClick={onClose}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      )}
    </div>
  );
};

// connect(mapStateToProps, mapDispatchToProps)(MyComp);
export const CreateUserStatus = connect(
  (state) => ({ createUserStatus: state.userState.createUserStatus }),
  { resetCreateUserStatusAction }
)(({ createUserStatus, resetCreateUserStatusAction }) => {
  console.log("CreateUserStatus");
  return (
    <>
      {createUserStatus.loading && (
        <StatusMsg onClose={resetCreateUserStatusAction}>
          Creating User...
        </StatusMsg>
      )}
      {createUserStatus.success && (
        <StatusMsg success onClose={resetCreateUserStatusAction}>
          User Created Successfully
        </StatusMsg>
      )}
      {createUserStatus.error && (
        <StatusMsg error onClose={resetCreateUserStatusAction}>
          Failed to Create User
        </StatusMsg>
      )}
    </>
  );
});

// connect(mapStateToProps, mapDispatchToProps)(MyComp);
export const UpdateUserStatus = connect(
  (state) => ({ updateUserStatus: state.userState.updateUserStatus }),
  { resetUpdateUserStatusAction }
)(({ updateUserStatus, resetUpdateUserStatusAction }) => {
  console.log("UpdateUserStatus");
  return (
    <>
      {updateUserStatus.loading && (
        <StatusMsg onClose={resetUpdateUserStatusAction}>
          Updating User...
        </StatusMsg>
      )}
      {updateUserStatus.success && (
        <StatusMsg success onClose={resetUpdateUserStatusAction}>
          User Updated Successfully
        </StatusMsg>
      )}
      {updateUserStatus.error && (
        <StatusMsg error onClose={resetUpdateUserStatusAction}>
          Failed to Update User
        </StatusMsg>
      )}
    </>
  );
});

// connect(mapStateToProps, mapDispatchToProps)(MyComp);
export const DeleteUserStatus = connect(
  (state) => ({ deleteUserStatus: state.userState.deleteUserStatus }),
  { resetDeleteUserStatusAction }
)(({ deleteUserStatus, resetDeleteUserStatusAction }) => {
  console.log("DeleteUserStatus");
  return (
    <>
      {deleteUserStatus.loading && (
        <StatusMsg onClose={resetDeleteUserStatusAction}>
          Deleting User...
        </StatusMsg>
      )}
      {deleteUserStatus.success && (
        <StatusMsg success onClose={resetDeleteUserStatusAction}>
          User Deleted Successfully
        </StatusMsg>
      )}
      {deleteUserStatus.error && (
        <StatusMsg error onClose={resetDeleteUserStatusAction}>
          Failed to Delete User
        </StatusMsg>
      )}
    </>
  );
});

export const UserMutaionStatus = () => {
  return (
    <>
      <CreateUserStatus />
      <UpdateUserStatus />
    </>
  );
};

// connect(mapStateToProps, mapDispatchToProps)(MyComp);
export const UserListStatus = connect(
  (state) => ({ users: state.userState.users }),
  null
)(({ users }) => {
  console.log("UserListStatus");
  if (users.loading)
    return (
      <div className="d-flex justify-content-center py-4">Loading Users...</div>
    );
  if (users.error) return <StatusMsg error>Error when getting Users</StatusMsg>;

  return null;
});
