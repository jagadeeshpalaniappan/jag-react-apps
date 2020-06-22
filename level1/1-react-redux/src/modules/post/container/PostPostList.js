import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import StatusQueryError from "../../common/components/StatusQueryError";
import StatusQueryLoading from "../../common/components/StatusQueryLoading";
import PostList from "../components/PostList";
import { apiGetPostPostsAction } from "../state/api/post.getPostPosts.action";

function PostPostList({ postId, postPosts, loading, error, getPostPosts }) {
  console.log("### PostPostList:");

  useEffect(() => {
    // onInit:
    getPostPosts({ postId });
  }, [postId, getPostPosts]);

  const handleRetry = () => getPostPosts({ postId });

  return (
    <div className="mt-3">
      <legend>Posts</legend>
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

PostPostList.propTypes = {
  postPosts: PropTypes.object.isRequired,
  getPostPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  console.log("PostPostList", state);
  const { loading, error, data } = state.postState.postPosts;
  return {
    loading,
    error,
    postPosts: data,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getPostPosts: (postPosts) => dispatch(apiGetPostPostsAction(postPosts)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(PostPostList));
