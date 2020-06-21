import React, { useCallback, useState } from "react";
import { FaFilter, FaUserPlus } from "react-icons/fa";
// import PropTypes from "prop-types";
import { NavLink, useRouteMatch } from "react-router-dom";
import { Button } from "reactstrap";
import PageSizeDropdown from "../../common/components/PageSizeDropdown";
import UserFiltersModal from "./UserFiltersModal";
import UserSortDropdown from "./UserSortDropdown";

const UsersToolbarActions = ({ filtersLength, openFilterModal }) => {
  console.log("### UsersToolbarActions:");
  let { path } = useRouteMatch();
  return (
    <>
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
          {filtersLength ? `(${filtersLength})` : ""}
          <span className="ml-1">Filters</span>
        </div>
      </Button>
      <PageSizeDropdown />
      <UserSortDropdown />
    </>
  );
};

const UsersToolbarActionsMemoz = React.memo(UsersToolbarActions);

const UsersToolbar = ({ filters, onFilter }) => {
  console.log("### UsersToolbar:");
  const [filterModalOpened, setFilterModalOpened] = useState(false);
  const openFilterModal = useCallback(() => setFilterModalOpened(true), []);
  const closeFilterModal = useCallback(() => setFilterModalOpened(false), []);

  const handleModalOk = useCallback(
    (newFilters) => {
      console.log("UserFiltersModal:onOk", { newFilters });
      closeFilterModal();
      onFilter(newFilters);
    },
    [onFilter, closeFilterModal]
  );

  return (
    <div className="d-flex align-items-center">
      <UsersToolbarActionsMemoz
        filtersLength={filters && filters.length}
        openFilterModal={openFilterModal}
      />
      <UserFiltersModal
        filters={filters}
        isOpen={filterModalOpened}
        onOk={handleModalOk}
        onCancel={closeFilterModal}
      />
    </div>
  );
};

UsersToolbar.propTypes = {};
export default React.memo(UsersToolbar);
