import React from "react";
import { FaUserPlus } from "react-icons/fa";
// import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { Button } from "reactstrap";
import PageSizeDropdown from "../../common/components/PageSizeDropdown";
import UserFiltersButton from "../container/UserFiltersButton";
import UserSortDropdown from "./UserSortDropdown";
import { basePath } from "../../../app/AppRoutes";

const UsersToolbar = () => {
  console.log("### UsersToolbar:");
  return (
    <div className="d-flex align-items-center">
      {/* 
      <Button className="ml-2">Import</Button>
      <Button className="ml-2">Export</Button>
      <Button className="ml-2">Delete All</Button>
       */}
      <Button
        tag={NavLink}
        to={`${basePath.user}/create`}
        color="primary"
        className="ml-2"
        exact
      >
        <div className="d-flex align-items-center">
          <FaUserPlus className="mr-2" />
          <span>Add user</span>
        </div>
      </Button>
      <UserFiltersButton />
      <PageSizeDropdown />
      <UserSortDropdown />
    </div>
  );
};

UsersToolbar.propTypes = {};
export default React.memo(UsersToolbar);
