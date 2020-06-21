import PropTypes from "prop-types";
import React from "react";
import { Button, ButtonGroup } from "reactstrap";
import { useHistory } from "react-router-dom";
import { useQueryParam } from "../../common/hooks";

const UserListPagination = ({ pagination }) => {
  console.log("### UserListPagination:");
  var history = useHistory();
  let query = useQueryParam();

  const handleNextPage = () => {
    query.delete("pageBefore");
    query.set("pageAfter", pagination.after);
    history.push({ search: query.toString() });
  };

  const handlePrevPage = () => {
    query.delete("pageAfter");
    query.set("pageBefore", pagination.before);
    history.push({ search: query.toString() });
  };

  return (
    <div className="d-flex justify-content-end my-3">
      <ButtonGroup>
        <Button
          onClick={handlePrevPage}
          disabled={!(pagination && pagination.before)}
        >
          Prev
        </Button>
        <Button
          onClick={handleNextPage}
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
};

export default React.memo(UserListPagination);
