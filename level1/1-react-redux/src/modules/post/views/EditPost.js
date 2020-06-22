import PropTypes from "prop-types";
import React, { useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import StatusQueryError from "../../common/components/StatusQueryError";
import StatusQueryLoading from "../../common/components/StatusQueryLoading";
import PostForm from "../components/PostForm";
import PostLayout from "../layout/PostLayout";
import { getPostAction, updatePostAction } from "../state/post.action";

function EditPost({
  exPostId,
  post,
  loading,
  error,
  mutationStatus,
  getPost,
  updatePost,
}) {
  console.log("### EditPost:");
  let { id } = useParams();
  useEffect(() => {
    // onInit:
    if (exPostId !== id) {
      getPost({ id });
    }
  }, [id, exPostId, getPost]);

  const handleSave = useCallback(
    (updatedPost) => updatePost({ id, ...updatedPost }),
    [updatePost, id]
  );

  const handleRetry = useCallback(() => getPost({ id }), [getPost, id]);

  const { updatePostStatus } = mutationStatus;

  return (
    <PostLayout title="Edit Post">
      <StatusQueryLoading loading={loading} text="Loading post details" />
      <StatusQueryError
        error={error}
        text="Error while getting post details"
        onRetry={handleRetry}
      />
      {post && Object.keys(post).length > 0 && (
        <>
          <PostForm post={post} status={updatePostStatus} onSave={handleSave} />
        </>
      )}
    </PostLayout>
  );
}

EditPost.propTypes = {
  post: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
  updatePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  console.log("EditPost", state);
  const { loading, error, data } = state.postState.post;
  return {
    loading,
    error,
    post: data,
    exPostId: data.id,
    mutationStatus: state.postState.mutationStatus,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getPost: (post) => dispatch(getPostAction(post)),
    updatePost: (post) => dispatch(updatePostAction(post)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(EditPost));
