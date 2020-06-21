import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import StatusBar from "../../common/components/StatusBar";
import { resetMutationStatusAction } from "../state/user.action";

const statusText = {
  createUserStatus: {
    loading: "Creating user...",
    error: "Error while creating user",
    success: "User created successfuly",
  },
  updateUserStatus: {
    loading: "Updating user...",
    error: "Error while updating user",
    success: "User updated successfuly",
  },

  deleteUserStatus: {
    loading: "Deleting user...",
    error: "Error while deleting user",
    success: "User deleted successfuly",
  },
};

function UserStatusBar({ mutationStatus, resetMutationStatus, timeout }) {
  console.log("### UserStatusBar:");
  const {
    createUserStatus,
    updateUserStatus,
    deleteUserStatus,
  } = mutationStatus;

  return (
    <>
      {/* <p>UserStatusBar</p>
      <pre>{JSON.stringify(mutationStatus, null, 2)}</pre> */}
      {createUserStatus && (
        <StatusBar
          status={createUserStatus}
          text={statusText.createUserStatus}
          timeout={timeout}
          onClose={resetMutationStatus}
        ></StatusBar>
      )}
      {updateUserStatus && (
        <StatusBar
          status={updateUserStatus}
          text={statusText.updateUserStatus}
          timeout={timeout}
          onClose={resetMutationStatus}
        ></StatusBar>
      )}
      {deleteUserStatus && (
        <StatusBar
          status={deleteUserStatus}
          text={statusText.deleteUserStatus}
          timeout={timeout}
          onClose={resetMutationStatus}
        ></StatusBar>
      )}
    </>
  );
}

UserStatusBar.propTypes = {
  mutationStatus: PropTypes.object.isRequired,
  timeout: PropTypes.number,
};
UserStatusBar.defaultProps = {
  timeout: 6000,
};

const mapStateToProps = (state) => ({
  mutationStatus: state.userState.mutationStatus,
});

const mapDispatchToProps = (dispatch) => {
  return {
    resetMutationStatus: (user) => dispatch(resetMutationStatusAction(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserStatusBar);
