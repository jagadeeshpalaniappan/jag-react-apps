import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createPostAction } from "../state/post.action";
import PostForm from "../components/PostForm";
import PostLayout from "../layout/PostLayout";

function CreatePost({ mutationStatus, createPost }) {
  console.log("### CreatePost:");
  const handleSave = (newPost) => {
    createPost(newPost);
  };

  const { createPostStatus } = mutationStatus;

  return (
    <PostLayout title="Create Post">
      <PostForm status={createPostStatus} onSave={handleSave} />
    </PostLayout>
  );
}

CreatePost.propTypes = {
  mutationStatus: PropTypes.object.isRequired,
  createPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  console.log("CreatePost", state);
  return {
    mutationStatus: state.postState.mutationStatus,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    createPost: (post) => dispatch(createPostAction(post)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(CreatePost));
