import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import StatusQueryError from "../../common/components/StatusQueryError";
import StatusQueryLoading from "../../common/components/StatusQueryLoading";
import PostList from "../components/PostList";
import { apiGetPostsByUserIdAction } from "../state/api/post.getPostsByUserId.action";

function PostListByAuthor({
  exUserId,
  userId,
  authorPosts,
  loading,
  error,
  getPostsByUserId,
}) {
  console.log("### PostListByAuthor:");

  useEffect(() => {
    // onInit:
    console.log("PostListByAuthor: useEffect", { userId, exUserId });

    const canStart = exUserId ? exUserId !== userId : !!userId;
    if (canStart) {
      getPostsByUserId({ userId });
    }
  }, [userId, exUserId, getPostsByUserId]);

  const handleRetry = () => getPostsByUserId({ userId });

  return (
    <div className="mt-3">
      <legend>Author's Posts</legend>
      <StatusQueryLoading loading={loading} text="Loading Author's Posts" />
      <StatusQueryError
        error={error}
        text="Error while getting Post's Posts"
        onRetry={handleRetry}
      />
      {/* TODO: change it to PostList */}
      {authorPosts && authorPosts.length > 0 && (
        <PostList posts={authorPosts} />
      )}
    </div>
  );
}

PostListByAuthor.propTypes = {
  authorPosts: PropTypes.object.isRequired,
  getPostsByUserId: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  console.log("PostListByAuthor", state);
  const { loading, error, data } = state.postState.authorPosts;
  const authorInfo = state.postState.authorInfo;
  return {
    loading,
    error,
    authorPosts: data,
    exUserId: authorInfo.data.id,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getPostsByUserId: (authorPosts) =>
      dispatch(apiGetPostsByUserIdAction(authorPosts)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(PostListByAuthor));
