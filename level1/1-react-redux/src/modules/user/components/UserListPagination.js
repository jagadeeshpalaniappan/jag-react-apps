import PropTypes from "prop-types";
import React from "react";
import { Button, ButtonGroup } from "reactstrap";

const UserListPagination = ({ page, onPrevPage, onNextPage }) => {
  return (
    <div className="d-flex justify-content-end my-3">
      <ButtonGroup>
        <Button onClick={onPrevPage} disabled={!(page && page.before)}>
          Prev
        </Button>
        <Button onClick={onNextPage} disabled={!(page && page.after)}>
          Next
        </Button>
      </ButtonGroup>
    </div>
  );
};

UserListPagination.propTypes = {
  page: PropTypes.object,
  onPrevPage: PropTypes.func.isRequired,
  onNextPage: PropTypes.func.isRequired,
};

export default UserListPagination;
