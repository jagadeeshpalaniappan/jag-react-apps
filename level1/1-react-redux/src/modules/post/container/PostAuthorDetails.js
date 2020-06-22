import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import UserCard from "../../user/components/UserCard";
import { deleteUserAction, getUserAction } from "../../user/state/user.action";

function PostAuthorDetails({ userId, user, loading, error, getUser }) {
  console.log("### PostAuthorDetails:", userId);

  useEffect(() => {
    // onInit:
    if (userId) {
      getUser({ id: userId });
    }
  }, [userId, getUser]);

  const handleRetry = () => getUser({ id: userId });
  return (
    <div className="mt-3">
      <legend>Author Details</legend>
      <UserCard
        user={user}
        loading={loading}
        error={error}
        handleRetry={handleRetry}
      />
    </div>
  );
}

PostAuthorDetails.propTypes = {
  user: PropTypes.object.isRequired,
  getUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  console.log("PostAuthorDetails", state);
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
)(React.memo(PostAuthorDetails));
