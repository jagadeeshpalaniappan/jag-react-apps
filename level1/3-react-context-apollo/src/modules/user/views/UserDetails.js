import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useHistory, useParams } from "react-router-dom";
import { basePath } from "../../../app/AppRoutes";
import UserCard from "../components/UserCard";
import UserDetailsToolbar from "../components/UserDetailsToolbar";
import UserPostList from "../container/UserPostList";
import UserTodoList from "../container/UserTodoList";
import UserLayout from "../layout/UserLayout";

const statusText = {
  loading: "Deleting user...",
  error: "Error while deleting user",
  success: "User deleted successfuly",
};

const GET_USER = gql`
  query($id: ID!) {
    user(id: $id) {
      id
      name
      email
      username
      phone
      sex
      role
      posts {
        id
        title
        body
        isActive
      }
      todos {
        id
        title
        description
        isActive
      }
    }
  }
`;

const DELETE_USER = gql`
  mutation($id: ID!) {
    deleteUser(id: $id)
  }
`;

function UserDetails() {
  var history = useHistory();
  let { id } = useParams();

  const onDeleteSuccess = (data) => {
    console.log("onDeleteSuccess", data);
    toast(statusText.success, { type: "success" });
    history.push(basePath.user);
  };

  const onDeleteError = (err) => {
    console.error("onDeleteError:", err);
    toast(statusText.error, { type: "error", autoClose: false });
  };

  const [
    deleteUser,
    { loading: delLoading, error: delError, data: delData },
  ] = useMutation(DELETE_USER, {
    variables: { id },
    onCompleted: onDeleteSuccess,
    onError: onDeleteError,
  });

  const [loadUser, { loading, error, data }] = useLazyQuery(GET_USER, {
    variables: { id },
  });
  const user = data ? data.user : {};
  console.log("### UserDetails:", { loading, error, data });

  useEffect(() => {
    // onInit:
    loadUser();
  }, [id, loadUser]);

  const handleDelete = () => {
    deleteUser();
  };

  const handleRetry = () => loadUser();

  return (
    <UserLayout
      title="User"
      actions={
        <UserDetailsToolbar
          user={user}
          hidden={loading || error}
          onDelete={handleDelete}
        />
      }
    >
      <UserCard
        user={user}
        loading={loading}
        error={error}
        handleRetry={handleRetry}
      />
      <UserPostList posts={user.posts} />
      <UserTodoList todos={user.todos} />
    </UserLayout>
  );
}

UserDetails.propTypes = {};
export default React.memo(UserDetails);
