import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import { Alert as BSAlert } from "reactstrap";
import ErrorDetailsModal from "./ErrorDetailsModal";

function Alert({ status, text, onClose, timeout }) {
  const [visible, setVisible] = useState(true);
  const onDismiss = useCallback(() => {
    setVisible(false);
    onClose();
  }, [onClose]);

  useEffect(() => {
    let myTimer = null;
    if (status && status.success) {
      // call: onDismiss after '1000ms'
      myTimer = setTimeout(onDismiss, timeout);
    }
    return () => {
      if (myTimer) {
        // clears: myTimer (setTimeout) when component unmount
        clearTimeout(myTimer);
      }
    };
  }, [status, onDismiss, timeout]);

  return (
    <>
      {status && (
        <BSAlert
          color={getColor(status)}
          isOpen={visible}
          toggle={status.loading ? null : onDismiss}
        >
          {status.loading && text.loading}
          {status.error && (
            <>
              <span>{text.error}</span>
              <ErrorDetailsModal
                triggerText="...more details"
                item={status.error}
              />
            </>
          )}
          {status.success && text.success}
        </BSAlert>
      )}
    </>
  );
}

const getColor = (status) => {
  if (status.success) {
    return "success";
  } else if (status.loading) {
    return "primary";
  } else if (status.error) {
    return "danger";
  }
  return "primary";
};

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

function StatusBar({ status, onClose, timeout }) {
  const { createUserStatus, updateUserStatus, deleteUserStatus } = status;

  return (
    <>
      <p>StatusBar</p>
      <pre>{JSON.stringify(status, null, 2)}</pre>
      {createUserStatus && (
        <Alert
          status={createUserStatus}
          text={statusText.createUserStatus}
          timeout={timeout}
          onClose={onClose}
        ></Alert>
      )}
      {updateUserStatus && (
        <Alert
          status={updateUserStatus}
          text={statusText.updateUserStatus}
          timeout={timeout}
          onClose={onClose}
        ></Alert>
      )}
      {deleteUserStatus && (
        <Alert
          status={deleteUserStatus}
          text={statusText.deleteUserStatus}
          timeout={timeout}
          onClose={onClose}
        ></Alert>
      )}
    </>
  );
}

StatusBar.propTypes = {
  status: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  timeout: PropTypes.number,
};
StatusBar.defaultProps = {
  timeout: 6000,
};

export default StatusBar;
