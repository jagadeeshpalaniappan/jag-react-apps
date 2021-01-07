import React, { useState } from "react";
import { connect } from "react-redux";

import { resetCreatePostStatusAction } from "../state/createPost/actions";
import { resetDeletePostStatusAction } from "../state/deletePost/actions";
import { resetUpdatePostStatusAction } from "../state/updatePost/actions";

import {
  getCreatePostStatus,
  getUpdatePostStatus,
  getDeletePostStatus,
  getPostStatus,
} from "../state/selectors";

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
export const CreatePostStatus = connect(
  (state) => ({ status: getCreatePostStatus(state) }),
  { onClose: resetCreatePostStatusAction }
)(({ status, onClose }) => {
  console.log("CreatePostStatus");
  return (
    <>
      {status.loading && (
        <StatusMsg onClose={onClose}>Creating Post...</StatusMsg>
      )}
      {status.success && (
        <StatusMsg success onClose={onClose}>
          Post Created Successfully
        </StatusMsg>
      )}
      {status.error && (
        <StatusMsg error onClose={onClose}>
          Failed to Create Post
        </StatusMsg>
      )}
    </>
  );
});

// connect(mapStateToProps, mapDispatchToProps)(MyComp);
export const UpdatePostStatus = connect(
  (state) => ({ status: getUpdatePostStatus(state) }),
  { onClose: resetUpdatePostStatusAction }
)(({ status, onClose }) => {
  console.log("UpdatePostStatus");
  return (
    <>
      {status.loading && (
        <StatusMsg onClose={onClose}>Updating Post...</StatusMsg>
      )}
      {status.success && (
        <StatusMsg success onClose={onClose}>
          Post Updated Successfully
        </StatusMsg>
      )}
      {status.error && (
        <StatusMsg error onClose={onClose}>
          Failed to Update Post
        </StatusMsg>
      )}
    </>
  );
});

// connect(mapStateToProps, mapDispatchToProps)(MyComp);
export const DeletePostStatus = connect(
  (state) => ({ status: getDeletePostStatus(state) }),
  { onClose: resetDeletePostStatusAction }
)(({ status, onClose }) => {
  console.log("DeletePostStatus");
  return (
    <>
      {status.loading && (
        <StatusMsg onClose={onClose}>Deleting Post...</StatusMsg>
      )}
      {status.success && (
        <StatusMsg success onClose={onClose}>
          Post Deleted Successfully
        </StatusMsg>
      )}
      {status.error && (
        <StatusMsg error onClose={onClose}>
          Failed to Delete Post
        </StatusMsg>
      )}
    </>
  );
});

export const PostMutaionStatus = () => {
  return (
    <>
      <CreatePostStatus />
      <UpdatePostStatus />
    </>
  );
};

// connect(mapStateToProps, mapDispatchToProps)(MyComp);
export const PostListStatus = connect(
  (state) => ({ status: getPostStatus(state) }),
  null
)(({ status }) => {
  console.log("PostListStatus");
  if (status.loading)
    return (
      <div className="d-flex justify-content-center py-4">Loading Posts...</div>
    );
  if (status.error)
    return <StatusMsg error>Error when getting Posts</StatusMsg>;

  return null;
});
