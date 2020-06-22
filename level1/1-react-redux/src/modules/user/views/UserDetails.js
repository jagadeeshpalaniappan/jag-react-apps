import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import UserCard from "../components/UserCard";
import UserDetailsToolbar from "../components/UserDetailsToolbar";
import UserPostList from "../container/UserPostList";
import UserTodoList from "../container/UserTodoList";
import UserLayout from "../layout/UserLayout";
import { deleteUserAction, getUserAction } from "../state/user.action";

function UserDetails({
  user,
  loading,
  error,
  getUser,
  deleteUser,
  userPosts,
  userTodos,
}) {
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
      <UserCard
        user={user}
        loading={loading}
        error={error}
        handleRetry={handleRetry}
      />
      <UserPostList userId={id} />
      <UserTodoList userId={id} />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(UserDetails));
