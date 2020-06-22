import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import StatusQueryError from "../../common/components/StatusQueryError";
import StatusQueryLoading from "../../common/components/StatusQueryLoading";
import PostList from "../components/PostList";
import { apiGetPostTodosAction } from "../state/api/post.getPostTodos.action";

function PostTodoList({ postId, postTodos, loading, error, getUserTodos }) {
  console.log("### PostTodoList:");

  useEffect(() => {
    // onInit:
    getUserTodos({ postId });
  }, [postId, getUserTodos]);

  const handleRetry = () => getUserTodos({ postId });

  return (
    <div className="mt-3">
      <legend>Todos</legend>
      <StatusQueryLoading loading={loading} text="Loading Post's Todos" />
      <StatusQueryError
        error={error}
        text="Error while getting Post's Todos"
        onRetry={handleRetry}
      />
      {/* TODO: change it to TodoList */}
      {postTodos && postTodos.length > 0 && <PostList posts={postTodos} />}
    </div>
  );
}

PostTodoList.propTypes = {
  postTodos: PropTypes.object.isRequired,
  getUserTodos: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  console.log("PostTodoList", state);
  const { loading, error, data } = state.postState.postTodos;
  return {
    loading,
    error,
    postTodos: data,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getUserTodos: (postTodos) => dispatch(apiGetPostTodosAction(postTodos)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(PostTodoList));
