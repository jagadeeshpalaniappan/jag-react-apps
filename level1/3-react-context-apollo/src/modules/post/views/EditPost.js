import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React, { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import StatusQueryError from "../../common/components/StatusQueryError";
import StatusQueryLoading from "../../common/components/StatusQueryLoading";
import PostForm from "../components/PostForm";
import PostLayout from "../layout/PostLayout";

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

const UPDATE_POST = gql`
  mutation($id: ID!, $input: UpdatePostInput!) {
    updatePost(id: $id, input: $input) {
      id
      title
    }
  }
`;

const statusText = {
  loading: "Updating post...",
  error: "Error while updating post",
  success: "Post updated successfuly",
};

function EditPost() {
  let { id } = useParams();

  // GET_POST:
  // --------------------------------
  const [loadPost, { loading, error, data }] = useLazyQuery(GET_POST, {
    variables: { id },
  });
  const post = data ? data.post : {};
  console.log("### EditPost:", { id, loading, error, data });

  useEffect(() => {
    // onInit:
    loadPost();
  }, [id, loadPost]);

  const handleRetry = useCallback(() => loadPost(), [loadPost]);

  // UPDATE_POST:
  // --------------------------------
  const onUpdateSuccess = (data) => {
    console.log("onUpdateSuccess", data);
    toast(statusText.success, { type: "success" });
  };
  const onUpdateError = (err) => {
    console.error("onUpdateError:", err);
    toast(statusText.error, { type: "error", autoClose: false });
  };

  const [
    updatePost,
    { loading: updateLoading, error: updateError },
  ] = useMutation(UPDATE_POST, {
    onCompleted: onUpdateSuccess,
    onError: onUpdateError,
  });
  const updatePostStatus = { loading: updateLoading, error: updateError };

  const handleSave = useCallback(
    (updatedPost) => updatePost({ variables: { id, input: updatedPost } }),
    [updatePost, id]
  );

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

EditPost.propTypes = {};

export default React.memo(EditPost);
