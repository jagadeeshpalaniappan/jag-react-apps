import PropTypes from "prop-types";
import React from "react";
import { MdError } from "react-icons/md";
import { Button } from "reactstrap";
import StatusErrorDetailsBtnAndModal from "./StatusErrorDetailsBtnAndModal";

function StatusQueryError({ error, text, onRetry }) {
  return (
    <>
      {error && (
        <div className="d-flex justify-content-center bg-light my-5 py-5">
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
                <StatusErrorDetailsBtnAndModal
                  triggerText="Show error details"
                  item={error}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

StatusQueryError.propTypes = {
  error: PropTypes.string,
  text: PropTypes.string,
  onRetry: PropTypes.func,
};

export default StatusQueryError;
