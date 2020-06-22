import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import UserCard from "../../user/components/UserCard";
import { apiGetAuthorInfoAction } from "../state/api/post.getAuthorInfo.action";

function PostAuthorDetails({ userId, user, loading, error, getAuthorInfo }) {
  console.log("### PostAuthorDetails:", userId);

  useEffect(() => {
    // onInit:
    if (userId) {
      getAuthorInfo({ id: userId });
    }
  }, [userId, getAuthorInfo]);

  const handleRetry = () => getAuthorInfo({ id: userId });
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
  getAuthorInfo: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  console.log("PostAuthorDetails", state);
  const { loading, error, data } = state.postState.authorInfo;
  return {
    loading,
    error,
    user: data,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAuthorInfo: (user) => dispatch(apiGetAuthorInfoAction(user)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(PostAuthorDetails));
