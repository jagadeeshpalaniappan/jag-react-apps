/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import PostForm from "./PostForm";
import { PostMutaionStatus } from "./PostStatus";
import { apiCreatePostAction } from "../state/createPost/actions";
import { apiUpdatePostAction } from "../state/updatePost/actions";
import { closePostModalAndResetStatusAction } from "../state/postModal/actions";
import { getPostModal } from "../state/selectors";

const PostModal = ({
  isOpen,
  post,
  apiCreatePostAction,
  apiUpdatePostAction,
  onClose,
}) => {
  const handleSave = (formPost) => {
    if (formPost.id) apiUpdatePostAction(formPost);
    else apiCreatePostAction(formPost);
  };

  const toggle = (...args) => {
    console.log("toggle", args);
    onClose();
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        toggle={toggle}
        backdrop
        keyboard
        contentClassName="bg-light"
      >
        <ModalHeader className="border-0">
          {post && post.id ? "Update Post" : "Create Post"}
        </ModalHeader>
        <ModalBody className="px-5">
          <PostMutaionStatus />
          <PostForm post={post} onSave={handleSave} onCancel={onClose} />
        </ModalBody>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { isOpen, post } = getPostModal(state);
  return { isOpen, post };
};

const mapDispatchToProps = {
  apiCreatePostAction,
  apiUpdatePostAction,
  onClose: closePostModalAndResetStatusAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(PostModal));
