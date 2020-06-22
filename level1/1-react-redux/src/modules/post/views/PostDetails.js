import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { Card } from "reactstrap";
import StatusQueryError from "../../common/components/StatusQueryError";
import StatusQueryLoading from "../../common/components/StatusQueryLoading";
import PostDetailsToolbar from "../components/PostDetailsToolbar";
import PostAuthorDetails from "../container/PostAuthorDetails";
import PostLayout from "../layout/PostLayout";
import { deletePostAction, getPostAction } from "../state/post.action";

function PostDetails({
  post,
  loading,
  error,
  getPost,
  deletePost,
  postPosts,
  postTodos,
}) {
  console.log("### PostDetails:");
  let { id } = useParams();

  useEffect(() => {
    // onInit:
    getPost({ id });
  }, [id, getPost]);

  const handleDelete = () => {
    deletePost(post);
  };

  const handleRetry = () => getPost({ id });

  return (
    <PostLayout
      title="Post"
      actions={
        <PostDetailsToolbar
          post={post}
          hidden={loading || error}
          onDelete={handleDelete}
        />
      }
    >
      <StatusQueryLoading loading={loading} text="Loading post details" />
      <StatusQueryError
        error={error}
        text="Error while getting post details"
        onRetry={handleRetry}
      />
      {post && Object.keys(post).length > 0 && (
        <>
          {/* <pre>{JSON.stringify(post, null, 2)}</pre> */}

          <Card body>
            <div>
              <label>ID:</label>
              <legend>{post.id}</legend>
            </div>
            <div>
              <label>Title:</label>
              <legend>{post.title}</legend>
            </div>
            <div>
              <label>Body:</label>
              <legend>{post.body}</legend>
            </div>
            <div>
              <label>UserId:</label>
              <legend>{post.userId}</legend>
            </div>
            <div>
              <label>Active:</label>
              <legend>{post.isActive ? "Yes" : "No"}</legend>
            </div>
          </Card>
        </>
      )}

      <PostAuthorDetails userId={post.userId} />
      {/* <PostPostList postId={id} />
      <PostTodoList postId={id} /> */}
    </PostLayout>
  );
}

PostDetails.propTypes = {
  post: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  console.log("PostDetails", state);
  const { loading, error, data } = state.postState.post;
  return {
    loading,
    error,
    post: data,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getPost: (post) => dispatch(getPostAction(post)),
    deletePost: (post) => dispatch(deletePostAction(post)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(PostDetails));
