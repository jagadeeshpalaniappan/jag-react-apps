import PropTypes from "prop-types";
import React from "react";
import { Button, ButtonGroup } from "reactstrap";

const UserListPagination = ({ pagination, onPrevPage, onNextPage }) => {
  console.log("### UserListPagination:");
  return (
    <div className="d-flex justify-content-end my-3">
      <ButtonGroup>
        <Button
          onClick={onPrevPage}
          disabled={!(pagination && pagination.before)}
        >
          Prev
        </Button>
        <Button
          onClick={onNextPage}
          disabled={!(pagination && pagination.after)}
        >
          Next
        </Button>
      </ButtonGroup>
    </div>
  );
};

UserListPagination.propTypes = {
  pagination: PropTypes.object,
  onPrevPage: PropTypes.func.isRequired,
  onNextPage: PropTypes.func.isRequired,
};

export default React.memo(UserListPagination);
