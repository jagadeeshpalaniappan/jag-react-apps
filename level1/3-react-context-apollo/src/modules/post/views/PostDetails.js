import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useHistory, useParams } from "react-router-dom";
import { basePath } from "../../../app/AppRoutes";
import PostCard from "../components/PostCard";
import PostDetailsToolbar from "../components/PostDetailsToolbar";
// import PostPostList from "../container/PostList";
// import PostTodoList from "../container/PostTodoList";
import PostLayout from "../layout/PostLayout";

const statusText = {
  loading: "Deleting post...",
  error: "Error while deleting post",
  success: "Post deleted successfuly",
};

const GET_POST = gql`
  query($id: ID!) {
    post(id: $id) {
      id
      title
      body
      isActive
      user {
        id
        name
        email
        username
      }
    }
  }
`;

const DELETE_POST = gql`
  mutation($id: ID!) {
    deletePost(id: $id)
  }
`;

function PostDetails() {
  var history = useHistory();
  let { id } = useParams();

  const onDeleteSuccess = (data) => {
    console.log("onDeleteSuccess", data);
    toast(statusText.success, { type: "success" });
    history.push(basePath.post);
  };

  const onDeleteError = (err) => {
    console.error("onDeleteError:", err);
    toast(statusText.error, { type: "error", autoClose: false });
  };

  const [
    deletePost,
    // { loading: delLoading, error: delError, data: delData },
  ] = useMutation(DELETE_POST, {
    variables: { id },
    onCompleted: onDeleteSuccess,
    onError: onDeleteError,
  });

  const [loadPost, { loading, error, data }] = useLazyQuery(GET_POST, {
    variables: { id },
  });
  const post = data ? data.post : {};
  console.log("### PostDetails:", { loading, error, data });

  useEffect(() => {
    // onInit:
    loadPost();
  }, [id, loadPost]);

  const handleDelete = () => {
    deletePost();
  };

  const handleRetry = () => loadPost();

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
      <PostCard
        post={post}
        loading={loading}
        error={error}
        handleRetry={handleRetry}
      />
      {/*       <PostAuthorDetails userId={post.userId} />
      <PostListByAuthor userId={post.userId} /> 
      */}
    </PostLayout>
  );
}

PostDetails.propTypes = {};
export default React.memo(PostDetails);
