import React, { useState } from "react";
// import PropTypes from "prop-types";
import { useRouteMatch, NavLink } from "react-router-dom";
import {
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const SortBy = ({ value, onChange }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret className="ml-2">
        Sort By
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem
          active={value === "default"}
          onClick={() => onChange("default")}
        >
          Default
        </DropdownItem>
        <DropdownItem
          active={value === "name"}
          onClick={() => onChange("name")}
        >
          Name
        </DropdownItem>
        <DropdownItem
          active={value === "username"}
          onClick={() => onChange("username")}
        >
          Username
        </DropdownItem>
        <DropdownItem
          active={value === "created"}
          onClick={() => onChange("created")}
        >
          Created
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

const UsersToolbar = ({ sortBy, onSortValChange }) => {
  let { path } = useRouteMatch();
  // const handleChange = (selectedItem) => {
  //   console.log("handleChange", selectedItem);
  // };
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
      <SortBy value={sortBy} onChange={onSortValChange} />
    </div>
  );
};

UsersToolbar.propTypes = {};

export default UsersToolbar;
