import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { basePath } from "../../../app/AppRoutes";
import PostForm from "../components/PostForm";
import PostLayout from "../layout/PostLayout";

const CREATE_POST = gql`
  mutation($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      title
    }
  }
`;

const statusText = {
  loading: "Creating post...",
  error: "Error while creating post",
  success: "Post created successfuly",
};

function CreatePost() {
  console.log("### CreatePost:");
  var history = useHistory();

  // UPDATE_POST:
  // --------------------------------
  const onCreateSuccess = (data) => {
    console.log("onCreateSuccess", data);
    toast(statusText.success, { type: "success" });
    history.push(`${basePath.post}/${data.createPost.id}`);
  };
  const onCreateError = (err) => {
    console.error("onCreateError:", err);
    toast(statusText.error, { type: "error", autoClose: false });
  };

  const [createPost, { loading, error }] = useMutation(CREATE_POST, {
    onCompleted: onCreateSuccess,
    onError: onCreateError,
  });
  const createPostStatus = { loading, error };

  const handleSave = useCallback(
    (newPost) => {
      createPost({ variables: { input: newPost } });
    },
    [createPost]
  );

  return (
    <PostLayout title="Create Post">
      <PostForm status={createPostStatus} onSave={handleSave} />
    </PostLayout>
  );
}

CreatePost.propTypes = {};
export default React.memo(CreatePost);
