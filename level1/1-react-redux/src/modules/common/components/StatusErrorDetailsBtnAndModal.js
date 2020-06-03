import PropTypes from "prop-types";
import React, { useState } from "react";
import { Button, Modal, ModalBody } from "reactstrap";

function ErrorDetailsModal({ triggerText, item }) {
  const [errDetailsVisible, setErrDetailsVisible] = useState(false);
  const openErrorDetails = () => setErrDetailsVisible(true);
  const closeErrorDetails = () => setErrDetailsVisible(false);
  return (
    <>
      {item && (
        <>
          <Button color="link" className="p-0" onClick={openErrorDetails}>
            {triggerText}
          </Button>
          <Modal isOpen={errDetailsVisible} toggle={closeErrorDetails}>
            <ModalBody>
              <h5>Error Details</h5>
              <p>{item}</p>
              <div className="d-flex justify-content-end">
                <Button
                  type="button"
                  color="primary"
                  onClick={closeErrorDetails}
                >
                  Ok
                </Button>
              </div>
            </ModalBody>
          </Modal>
        </>
      )}
    </>
  );
}

ErrorDetailsModal.propTypes = {
  triggerText: PropTypes.string.isRequired,
  item: PropTypes.object,
};

export default ErrorDetailsModal;
