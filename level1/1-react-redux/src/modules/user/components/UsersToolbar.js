import React, { useState } from "react";
// import PropTypes from "prop-types";
import { NavLink, useHistory, useRouteMatch } from "react-router-dom";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { FaUserPlus, FaFilter } from "react-icons/fa";
import { useQueryParam } from "../../common/hooks";
import UserFiltersModal from "./UserFiltersModal";

const SortBy = () => {
  let query = useQueryParam();
  var history = useHistory();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const handleChange = (newSortBy) => {
    query.set("sortBy", newSortBy);
    history.push({ search: query.toString() });
  };
  const sortBy = query.get("sortBy");
  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret className="ml-2">
        Sort by
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem
          active={sortBy === "default" || !sortBy}
          onClick={() => handleChange("default")}
        >
          Default
        </DropdownItem>
        <DropdownItem
          active={sortBy === "name"}
          onClick={() => handleChange("name")}
        >
          Name
        </DropdownItem>
        <DropdownItem
          active={sortBy === "username"}
          onClick={() => handleChange("username")}
        >
          Username
        </DropdownItem>
        <DropdownItem
          active={sortBy === "updatedTs"}
          onClick={() => handleChange("updatedTs")}
        >
          Updated
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

const PageSize = () => {
  let query = useQueryParam();
  var history = useHistory();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const handleChange = (newPageSize) => {
    query.set("pageSize", newPageSize);
    history.push({ search: query.toString() });
  };

  const pageSize = query.get("pageSize");
  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret className="ml-2">
        Page size
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem
          active={pageSize === "10" || !pageSize}
          onClick={() => handleChange("10")}
        >
          10 (default)
        </DropdownItem>
        <DropdownItem
          active={pageSize === "20"}
          onClick={() => handleChange("20")}
        >
          20
        </DropdownItem>
        <DropdownItem
          active={pageSize === "40"}
          onClick={() => handleChange("40")}
        >
          40
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

const UsersToolbar = ({ filters, onFilter }) => {
  let { path } = useRouteMatch();
  const [filterModalOpened, setFilterModalOpened] = useState(false);
  const openFilterModal = () => setFilterModalOpened(true);
  const closeFilterModal = () => setFilterModalOpened(false);

  return (
    <div className="d-flex align-items-center">
      {/* 
      <Button className="ml-2">Import</Button>
      <Button className="ml-2">Export</Button>
      <Button className="ml-2">Delete All</Button>
       */}
      <Button
        tag={NavLink}
        to={`${path}/create`}
        color="primary"
        className="ml-2"
        prefix={FaUserPlus}
        exact
      >
        <div className="d-flex align-items-center">
          <FaUserPlus className="mr-2" />
          <span>Add user</span>
        </div>
      </Button>
      <Button className="ml-2" onClick={openFilterModal}>
        <div className="d-flex align-items-center">
          <FaFilter className="mr-1" />
          {filters ? `(${filters.length})` : ""}
          <span className="ml-1">Filters</span>
        </div>
      </Button>
      <PageSize />
      <SortBy />

      <UserFiltersModal
        filters={filters}
        isOpen={filterModalOpened}
        onOk={(newFilters) => {
          console.log("UserFiltersModal:onOk", { newFilters });
          closeFilterModal();
          onFilter(newFilters);
        }}
        onCancel={closeFilterModal}
      />
    </div>
  );
};

UsersToolbar.propTypes = {};

export default UsersToolbar;
