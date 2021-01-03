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
  (state) => ({
    createUserStatus: state.userState.createUserStatus,
  }),
  (dispatch) => {
    return {
      resetCreateUserStatus: () => dispatch(resetCreateUserStatusAction()),
    };
  }
)(({ createUserStatus, resetCreateUserStatus }) => {
  console.log("CreateUserStatus");
  return (
    <>
      {createUserStatus.loading && (
        <StatusMsg onClose={resetCreateUserStatus}>Creating User...</StatusMsg>
      )}
      {createUserStatus.success && (
        <StatusMsg success onClose={resetCreateUserStatus}>
          User Created Successfully
        </StatusMsg>
      )}
      {createUserStatus.error && (
        <StatusMsg error onClose={resetCreateUserStatus}>
          Failed to Create User
        </StatusMsg>
      )}
    </>
  );
});

// connect(mapStateToProps, mapDispatchToProps)(MyComp);
export const UpdateUserStatus = connect(
  (state) => ({
    updateUserStatus: state.userState.updateUserStatus,
  }),
  (dispatch) => {
    return {
      resetUpdateUserStatus: () => dispatch(resetUpdateUserStatusAction()),
    };
  }
)(({ updateUserStatus, resetUpdateUserStatus }) => {
  console.log("UpdateUserStatus");
  return (
    <>
      {updateUserStatus.loading && (
        <StatusMsg onClose={resetUpdateUserStatus}>Updating User...</StatusMsg>
      )}
      {updateUserStatus.success && (
        <StatusMsg success onClose={resetUpdateUserStatus}>
          User Updated Successfully
        </StatusMsg>
      )}
      {updateUserStatus.error && (
        <StatusMsg error onClose={resetUpdateUserStatus}>
          Failed to Update User
        </StatusMsg>
      )}
    </>
  );
});

// connect(mapStateToProps, mapDispatchToProps)(MyComp);
export const DeleteUserStatus = connect(
  (state) => ({
    deleteUserStatus: state.userState.deleteUserStatus,
  }),
  (dispatch) => {
    return {
      resetDeleteUserStatus: () => dispatch(resetDeleteUserStatusAction()),
    };
  }
)(({ deleteUserStatus, resetDeleteUserStatus }) => {
  console.log("DeleteUserStatus");
  return (
    <>
      {deleteUserStatus.loading && (
        <StatusMsg onClose={resetDeleteUserStatus}>Deleting User...</StatusMsg>
      )}
      {deleteUserStatus.success && (
        <StatusMsg success onClose={resetDeleteUserStatus}>
          User Deleted Successfully
        </StatusMsg>
      )}
      {deleteUserStatus.error && (
        <StatusMsg error onClose={resetDeleteUserStatus}>
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
