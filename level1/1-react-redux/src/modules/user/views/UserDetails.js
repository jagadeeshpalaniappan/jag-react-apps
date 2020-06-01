import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import LoadingIndicator from "../../common/components/LoadingIndicator";
import UserDetailsToolbar from "../components/UserDetailsToolbar";
import UserLayout from "../layout/UserLayout";
import { deleteUserAction, getUserAction } from "../state/user.action";

function UserDetails({ user, status, getUser, deleteUser }) {
  let { id } = useParams();

  useEffect(() => {
    // onInit:
    getUser({ id });
  }, [id, getUser]);

  const handleDelete = () => {
    deleteUser(user);
  };

  return (
    <UserLayout
      title="User"
      actions={
        <UserDetailsToolbar
          user={user}
          status={status}
          onDelete={handleDelete}
        />
      }
    >
      <LoadingIndicator status={status} />
      {user && Object.keys(user).length > 0 && (
        <>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </>
      )}
    </UserLayout>
  );
}

UserDetails.propTypes = {
  user: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  getUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  console.log("UserDetails", state);
  return {
    user: state.userState.user.data,
    status: state.userState.user.status,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (user) => dispatch(getUserAction(user)),
    deleteUser: (user) => dispatch(deleteUserAction(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
