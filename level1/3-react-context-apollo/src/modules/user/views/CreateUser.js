import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React, { useCallback } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { basePath } from "../../../app/AppRoutes";
import UserForm from "../components/UserForm";
import UserLayout from "../layout/UserLayout";

const CREATE_USER = gql`
  mutation($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
    }
  }
`;

const statusText = {
  loading: "Creating user...",
  error: "Error while creating user",
  success: "User created successfuly",
};

function CreateUser() {
  console.log("### CreateUser:");
  var history = useHistory();

  // UPDATE_USER:
  // --------------------------------
  const onCreateSuccess = (data) => {
    console.log("onCreateSuccess", data);
    toast(statusText.success, { type: "success" });
    history.push(`${basePath.user}/${data.createUser.id}`);
  };
  const onCreateError = (err) => {
    console.error("onCreateError:", err);
    toast(statusText.error, { type: "error", autoClose: false });
  };

  const [createUser, { loading, error, data }] = useMutation(CREATE_USER, {
    onCompleted: onCreateSuccess,
    onError: onCreateError,
  });
  const createUserStatus = { loading, error };

  const handleSave = useCallback(
    (createdUser) => {
      createUser({ variables: { input: createdUser } });
    },
    [createUser]
  );

  return (
    <UserLayout title="Create User">
      <UserForm status={createUserStatus} onSave={handleSave} />
    </UserLayout>
  );
}

CreateUser.propTypes = {};
export default React.memo(CreateUser);
