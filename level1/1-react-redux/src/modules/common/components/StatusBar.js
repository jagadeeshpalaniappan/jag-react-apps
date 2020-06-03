import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import { Alert } from "reactstrap";
import StatusErrorDetailsBtnAndModal from "./StatusErrorDetailsBtnAndModal";

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

function StatusBar({ status, text, onClose, timeout }) {
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
        <Alert
          color={getColor(status)}
          isOpen={visible}
          toggle={status.loading ? null : onDismiss}
        >
          {status.loading && text.loading}
          {status.error && (
            <>
              <span>{text.error}</span>
              <StatusErrorDetailsBtnAndModal
                triggerText="...more details"
                item={status.error}
              />
            </>
          )}
          {status.success && text.success}
        </Alert>
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
