import React, { useState } from "react";
import PropTypes from "prop-types";
import { Spinner, Button } from "reactstrap";
import { MdError } from "react-icons/md";
import Toast from "reactstrap/lib/Toast";
import ToastHeader from "reactstrap/lib/ToastHeader";
import ToastBody from "reactstrap/lib/ToastBody";

function ErrorStatus({ error, text, onRetry }) {
  const [showErrDetails, setShowErrDetails] = useState(false);
  return (
    <>
      {error && (
        <div className="bg-light my-5 py-5">
          <div className="d-flex justify-content-center">
            <div className="d-flex align-items-center ">
              <MdError size="3em" />
              <div className="ml-2">
                <p className="m-0">{text}</p>
                <div>
                  {onRetry && (
                    <>
                      <Button color="link" className="p-0" onClick={onRetry}>
                        Retry
                      </Button>
                      <span className="mx-1">|</span>
                    </>
                  )}

                  <Button
                    color="link"
                    className="p-0"
                    onClick={() => setShowErrDetails(!showErrDetails)}
                  >
                    {showErrDetails ? "Hide" : "Show"} error details
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {showErrDetails && (
            <div className="d-flex justify-content-center my-4">
              <Toast style={{ minWidth: "30rem" }}>
                <ToastHeader icon="danger">Error Details</ToastHeader>
                <ToastBody>{error}</ToastBody>
              </Toast>
            </div>
          )}
        </div>
      )}
    </>
  );
}

ErrorStatus.propTypes = {
  error: PropTypes.string,
  text: PropTypes.string,
  onRetry: PropTypes.func,
};

export default ErrorStatus;
