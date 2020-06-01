import React from "react";
// import PropTypes from "prop-types";
import { useRouteMatch, NavLink } from "react-router-dom";
import { Button } from "reactstrap";

const UsersToolbar = ({ resetUser }) => {
  let { path } = useRouteMatch();
  return (
    <div className="d-flex align-items-center">
      <Button className="ml-2">Import</Button>
      <Button className="ml-2">Export</Button>
      <Button className="ml-2">Delete All</Button>
      <Button
        tag={NavLink}
        to={`${path}/create`}
        color="primary"
        className="ml-2"
        exact
      >
        Add User
      </Button>
    </div>
  );
};

UsersToolbar.propTypes = {};

export default UsersToolbar;
