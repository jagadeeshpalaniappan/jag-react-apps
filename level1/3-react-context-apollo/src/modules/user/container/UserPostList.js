import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import StatusQueryError from "../../common/components/StatusQueryError";
import StatusQueryLoading from "../../common/components/StatusQueryLoading";
import UsersList from "../components/UsersList";
import { apiGetUserPostsAction } from "../state/api/user.getUserPosts.action";

function UserPostList({ userId, userPosts, loading, error, getUserPosts }) {
  console.log("### UserPostList:");

  useEffect(() => {
    // onInit:
    getUserPosts({ userId });
  }, [userId, getUserPosts]);

  const handleRetry = () => getUserPosts({ userId });

  return (
    <div className="mt-3">
      <legend>Posts</legend>
      <StatusQueryLoading loading={loading} text="Loading User's Posts" />
      <StatusQueryError
        error={error}
        text="Error while getting User's Posts"
        onRetry={handleRetry}
      />
      {/* TODO: change it to PostList */}
      {userPosts && userPosts.length > 0 && <UsersList users={userPosts} />}
    </div>
  );
}

UserPostList.propTypes = {
  userPosts: PropTypes.object.isRequired,
  getUserPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  console.log("UserPostList", state);
  const { loading, error, data } = state.userState.userPosts;
  return {
    loading,
    error,
    userPosts: data,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getUserPosts: (userPosts) => dispatch(apiGetUserPostsAction(userPosts)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(UserPostList));
