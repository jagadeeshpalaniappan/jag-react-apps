import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import UserCard from "../../user/components/UserCard";
import { apiGetAuthorInfoAction } from "../state/api/post.getAuthorInfo.action";

function PostAuthorDetails({
  exUserId,
  userId,
  user,
  loading,
  error,
  getAuthorInfo,
}) {
  console.log("### PostAuthorDetails:", userId);

  useEffect(() => {
    console.log("### PostAuthorDetails:useEffect", { userId, exUserId });
    // onInit:
    const canStart = exUserId ? exUserId !== userId : !!userId;
    if (canStart) {
      getAuthorInfo({ id: userId });
    }
  }, [userId, exUserId, getAuthorInfo]);

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
  user: PropTypes.object,
  getAuthorInfo: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  console.log("PostAuthorDetails", state);
  const { loading, error, data } = state.postState.authorInfo;
  return {
    loading,
    error,
    user: data,
    exUserId: data && data.id,
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
