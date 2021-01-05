import React, { useState } from "react";
import { connect } from "react-redux";

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import { setFilterAction } from "../../state/filter/actions";

export const ActiveFilterDropDown = ({ filterActive, setFilterAction }) => {
  const [ddOpen, setDdOpen] = useState(false);
  return (
    <Dropdown isOpen={ddOpen} toggle={() => setDdOpen(!ddOpen)}>
      <DropdownToggle caret>Show {filterActive}</DropdownToggle>
      <DropdownMenu right>
        <DropdownItem
          onClick={() => setFilterAction({ active: "All" })}
          className={filterActive === "All" ? "bg-primary text-white" : ""}
        >
          All
        </DropdownItem>
        <DropdownItem
          onClick={() => setFilterAction({ active: "Active" })}
          className={filterActive === "Active" ? "bg-primary text-white" : ""}
        >
          Active
        </DropdownItem>
        <DropdownItem
          onClick={() => setFilterAction({ active: "InActive" })}
          className={filterActive === "InActive" ? "bg-primary text-white" : ""}
        >
          InActive
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

const mapStateToProps = (state) => ({
  filterActive: state.userState.filter.active,
});

const mapDispatchToProps = { setFilterAction };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveFilterDropDown);
