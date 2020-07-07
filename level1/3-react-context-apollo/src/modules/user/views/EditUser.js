import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React, { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import StatusQueryError from "../../common/components/StatusQueryError";
import StatusQueryLoading from "../../common/components/StatusQueryLoading";
import UserForm from "../components/UserForm";
import UserLayout from "../layout/UserLayout";
import StatusBar from "../../common/components/StatusBar";
import { useState } from "react";

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
    }
  }
`;

const UPDATE_USER = gql`
  mutation($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      name
    }
  }
`;

const statusText = {
  loading: "Updating user...",
  error: "Error while updating user",
  success: "User updated successfuly",
};

function EditUser() {
  let { id } = useParams();

  // GET_USER:
  // --------------------------------
  const [loadUser, { loading, error, data }] = useLazyQuery(GET_USER, {
    variables: { id },
  });
  const user = data ? data.user : {};
  console.log("### EditUser:", { id, loading, error, data });

  useEffect(() => {
    // onInit:
    loadUser();
  }, [id, loadUser]);

  const handleRetry = useCallback(() => loadUser(), [loadUser]);

  // UPDATE_USER:
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
    updateUser,
    { loading: updateLoading, error: updateError, data: updateData },
  ] = useMutation(UPDATE_USER, {
    onCompleted: onUpdateSuccess,
    onError: onUpdateError,
  });
  const updateUserStatus = { loading: updateLoading, error: updateError };

  const handleSave = useCallback(
    (updatedUser) => updateUser({ variables: { id, input: updatedUser } }),
    [updateUser, id]
  );

  return (
    <UserLayout title="Edit User">
      <StatusQueryLoading loading={loading} text="Loading user details" />
      <StatusQueryError
        error={error}
        text="Error while getting user details"
        onRetry={handleRetry}
      />
      {user && Object.keys(user).length > 0 && (
        <>
          <UserForm user={user} status={updateUserStatus} onSave={handleSave} />
        </>
      )}
    </UserLayout>
  );
}

EditUser.propTypes = {};

export default React.memo(EditUser);
