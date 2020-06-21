import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { Card } from "reactstrap";
import StatusQueryError from "../../common/components/StatusQueryError";
import StatusQueryLoading from "../../common/components/StatusQueryLoading";
import UserDetailsToolbar from "../components/UserDetailsToolbar";
import UserLayout from "../layout/UserLayout";
import { deleteUserAction, getUserAction } from "../state/user.action";

function UserDetails({ user, loading, error, getUser, deleteUser }) {
  console.log("### UserDetails:");
  let { id } = useParams();

  useEffect(() => {
    // onInit:
    getUser({ id });
  }, [id, getUser]);

  const handleDelete = () => {
    deleteUser(user);
  };

  const handleRetry = () => getUser({ id });

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
      <StatusQueryLoading loading={loading} text="Loading user details" />
      <StatusQueryError
        error={error}
        text="Error while getting user details"
        onRetry={handleRetry}
      />
      {user && Object.keys(user).length > 0 && (
        <>
          {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}

          <Card body>
            <div>
              <label>ID:</label>
              <legend>{user.id}</legend>
            </div>
            <div>
              <label>Name:</label>
              <legend>{user.name}</legend>
            </div>
            <div>
              <label>Email:</label>
              <legend>{user.email}</legend>
            </div>
            <div>
              <label>Username:</label>
              <legend>{user.username}</legend>
            </div>
            <div>
              <label>Sex:</label>
              <legend>{user.sex}</legend>
            </div>
            <div>
              <label>Role:</label>
              <legend>{user.role}</legend>
            </div>
            <div>
              <label>Active:</label>
              <legend>{user.isActive ? "Yes" : "No"}</legend>
            </div>
          </Card>
        </>
      )}
    </UserLayout>
  );
}

UserDetails.propTypes = {
  user: PropTypes.object.isRequired,
  getUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  console.log("UserDetails", state);
  const { loading, error, data } = state.userState.user;
  return {
    loading,
    error,
    user: data,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (user) => dispatch(getUserAction(user)),
    deleteUser: (user) => dispatch(deleteUserAction(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
