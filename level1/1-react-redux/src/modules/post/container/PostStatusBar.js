import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import StatusBar from "../../common/components/StatusBar";
import { resetMutationStatusAction } from "../state/post.action";

const statusText = {
  createPostStatus: {
    loading: "Creating post...",
    error: "Error while creating post",
    success: "Post created successfuly",
  },
  updatePostStatus: {
    loading: "Updating post...",
    error: "Error while updating post",
    success: "Post updated successfuly",
  },

  deletePostStatus: {
    loading: "Deleting post...",
    error: "Error while deleting post",
    success: "Post deleted successfuly",
  },
};

function PostStatusBar({ mutationStatus, resetMutationStatus, timeout }) {
  console.log("### PostStatusBar:");
  const {
    createPostStatus,
    updatePostStatus,
    deletePostStatus,
  } = mutationStatus;

  return (
    <>
      {/* <p>PostStatusBar</p>
      <pre>{JSON.stringify(mutationStatus, null, 2)}</pre> */}
      {createPostStatus && (
        <StatusBar
          status={createPostStatus}
          text={statusText.createPostStatus}
          timeout={timeout}
          onClose={resetMutationStatus}
        ></StatusBar>
      )}
      {updatePostStatus && (
        <StatusBar
          status={updatePostStatus}
          text={statusText.updatePostStatus}
          timeout={timeout}
          onClose={resetMutationStatus}
        ></StatusBar>
      )}
      {deletePostStatus && (
        <StatusBar
          status={deletePostStatus}
          text={statusText.deletePostStatus}
          timeout={timeout}
          onClose={resetMutationStatus}
        ></StatusBar>
      )}
    </>
  );
}

PostStatusBar.propTypes = {
  mutationStatus: PropTypes.object.isRequired,
  timeout: PropTypes.number,
};
PostStatusBar.defaultProps = {
  timeout: 6000,
};

const mapStateToProps = (state) => ({
  mutationStatus: state.postState.mutationStatus,
});

const mapDispatchToProps = (dispatch) => {
  return {
    resetMutationStatus: (post) => dispatch(resetMutationStatusAction(post)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(PostStatusBar));
