import React from "react";
import PropTypes from "prop-types";
import { AppModal, AppCard } from "../../common/components";

import { Button, Form } from "reactstrap";

const PostDeleteModal = ({ item, onOk, onCancel, ...rest }) => {
  console.log("### PostDeleteModal:");
  return (
    <AppModal toggle={onCancel} {...rest}>
      <AppCard>
        <h5>Confirm Delete</h5>
        <p>
          Are you sure do you want to delete <b>{item && item.name}</b> ?
        </p>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            onOk(e, item);
          }}
        >
          <div className="d-flex justify-content-end">
            <Button
              type="button"
              color="secondary"
              className="mr-2"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button type="submit" color="danger">
              Delete
            </Button>
          </div>
        </Form>
      </AppCard>
    </AppModal>
  );
};

PostDeleteModal.propTypes = {
  item: PropTypes.object.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default React.memo(PostDeleteModal);
