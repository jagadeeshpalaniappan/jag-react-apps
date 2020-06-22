import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import StatusQueryError from "../../common/components/StatusQueryError";
import StatusQueryLoading from "../../common/components/StatusQueryLoading";
import PostList from "../components/PostList";
import { apiGetPostsByUserIdAction } from "../state/api/post.getPostsByUserId.action";

function PostListByAuthor({
  userId,
  postPosts,
  loading,
  error,
  getPostsByUserId,
}) {
  console.log("### PostListByAuthor:");

  useEffect(() => {
    // onInit:
    if (userId) getPostsByUserId({ userId });
  }, [userId, getPostsByUserId]);

  const handleRetry = () => getPostsByUserId({ userId });

  return (
    <div className="mt-3">
      <legend>Author's Posts</legend>
      <StatusQueryLoading loading={loading} text="Loading Post's Posts" />
      <StatusQueryError
        error={error}
        text="Error while getting Post's Posts"
        onRetry={handleRetry}
      />
      {/* TODO: change it to PostList */}
      {postPosts && postPosts.length > 0 && <PostList posts={postPosts} />}
    </div>
  );
}

PostListByAuthor.propTypes = {
  postPosts: PropTypes.object.isRequired,
  getPostsByUserId: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  console.log("PostListByAuthor", state);
  const { loading, error, data } = state.postState.postPosts;
  return {
    loading,
    error,
    postPosts: data,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getPostsByUserId: (postPosts) =>
      dispatch(apiGetPostsByUserIdAction(postPosts)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(PostListByAuthor));
