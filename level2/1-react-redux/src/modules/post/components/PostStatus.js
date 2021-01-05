import React, { useState } from "react";
import { connect } from "react-redux";

import { resetCreatePostStatusAction } from "../state/createPost/actions";
import { resetDeletePostStatusAction } from "../state/deletePost/actions";
import { resetUpdatePostStatusAction } from "../state/updatePost/actions";

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
  (state) => ({ createPostStatus: state.postState.createPostStatus }),
  { resetCreatePostStatusAction }
)(({ createPostStatus, resetCreatePostStatusAction }) => {
  console.log("CreatePostStatus");
  return (
    <>
      {createPostStatus.loading && (
        <StatusMsg onClose={resetCreatePostStatusAction}>
          Creating Post...
        </StatusMsg>
      )}
      {createPostStatus.success && (
        <StatusMsg success onClose={resetCreatePostStatusAction}>
          Post Created Successfully
        </StatusMsg>
      )}
      {createPostStatus.error && (
        <StatusMsg error onClose={resetCreatePostStatusAction}>
          Failed to Create Post
        </StatusMsg>
      )}
    </>
  );
});

// connect(mapStateToProps, mapDispatchToProps)(MyComp);
export const UpdatePostStatus = connect(
  (state) => ({ updatePostStatus: state.postState.updatePostStatus }),
  { resetUpdatePostStatusAction }
)(({ updatePostStatus, resetUpdatePostStatusAction }) => {
  console.log("UpdatePostStatus");
  return (
    <>
      {updatePostStatus.loading && (
        <StatusMsg onClose={resetUpdatePostStatusAction}>
          Updating Post...
        </StatusMsg>
      )}
      {updatePostStatus.success && (
        <StatusMsg success onClose={resetUpdatePostStatusAction}>
          Post Updated Successfully
        </StatusMsg>
      )}
      {updatePostStatus.error && (
        <StatusMsg error onClose={resetUpdatePostStatusAction}>
          Failed to Update Post
        </StatusMsg>
      )}
    </>
  );
});

// connect(mapStateToProps, mapDispatchToProps)(MyComp);
export const DeletePostStatus = connect(
  (state) => ({ deletePostStatus: state.postState.deletePostStatus }),
  { resetDeletePostStatusAction }
)(({ deletePostStatus, resetDeletePostStatusAction }) => {
  console.log("DeletePostStatus");
  return (
    <>
      {deletePostStatus.loading && (
        <StatusMsg onClose={resetDeletePostStatusAction}>
          Deleting Post...
        </StatusMsg>
      )}
      {deletePostStatus.success && (
        <StatusMsg success onClose={resetDeletePostStatusAction}>
          Post Deleted Successfully
        </StatusMsg>
      )}
      {deletePostStatus.error && (
        <StatusMsg error onClose={resetDeletePostStatusAction}>
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
  (state) => ({ posts: state.postState.posts }),
  null
)(({ posts }) => {
  console.log("PostListStatus");
  if (posts.loading)
    return (
      <div className="d-flex justify-content-center py-4">Loading Posts...</div>
    );
  if (posts.error) return <StatusMsg error>Error when getting Posts</StatusMsg>;

  return null;
});
