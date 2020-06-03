import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import LoadingIndicator from "../../common/components/LoadingIndicator";
import { getUserAction, updateUserAction } from "../state/user.action";
import UserLayout from "../layout/UserLayout";
import UserForm from "../components/UserForm";
import LoadingStatus from "../../common/components/LoadingStatus";
import ErrorStatus from "../../common/components/ErrorStatus";

function EditUser({
  user,
  loading,
  error,
  mutationStatus,
  getUser,
  updateUser,
}) {
  let { id } = useParams();
  useEffect(() => {
    // onInit:
    getUser({ id });
  }, [id, getUser]);

  const handleSave = (e, updatedUser) => {
    updateUser(updatedUser);
  };
  const handleRetry = () => {
    getUser({ id });
  };

  return (
    <UserLayout title="Edit User">
      <LoadingStatus loading={loading} text="Loading user details" />
      <ErrorStatus
        error={error}
        text="Error while getting user details"
        onRetry={handleRetry}
      />
      {user && Object.keys(user).length > 0 && (
        <>
          <UserForm user={user} status={mutationStatus} onSave={handleSave} />
        </>
      )}
    </UserLayout>
  );
}

EditUser.propTypes = {
  user: PropTypes.object.isRequired,
  getUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  console.log("EditUser", state);
  const { loading, error, data } = state.userState.user;
  return {
    loading,
    error,
    user: data,
    mutationStatus: state.userState.mutationStatus,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (user) => dispatch(getUserAction(user)),
    updateUser: (user) => dispatch(updateUserAction(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
