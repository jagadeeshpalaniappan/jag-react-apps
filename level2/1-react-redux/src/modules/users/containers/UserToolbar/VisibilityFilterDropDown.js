import React, { useState } from "react";
import { connect } from "react-redux";

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import { setVisibilityFilterAction } from "../../state/visibilityFilter/actions";

export const VisibilityDropDown = ({
  visibilityFilter,
  setVisibilityFilterAction,
}) => {
  const [ddOpen, setDdOpen] = useState(false);
  return (
    <Dropdown isOpen={ddOpen} toggle={() => setDdOpen(!ddOpen)}>
      <DropdownToggle caret>Show {visibilityFilter}</DropdownToggle>
      <DropdownMenu right>
        <DropdownItem
          onClick={() => setVisibilityFilterAction("All")}
          className={visibilityFilter === "All" ? "bg-primary text-white" : ""}
        >
          All
        </DropdownItem>
        <DropdownItem
          onClick={() => setVisibilityFilterAction("Active")}
          className={
            visibilityFilter === "Active" ? "bg-primary text-white" : ""
          }
        >
          Active
        </DropdownItem>
        <DropdownItem
          onClick={() => setVisibilityFilterAction("InActive")}
          className={
            visibilityFilter === "InActive" ? "bg-primary text-white" : ""
          }
        >
          InActive
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

const mapStateToProps = (state) => ({
  visibilityFilter: state.userState.visibilityFilter,
});

const mapDispatchToProps = { setVisibilityFilterAction };
export default connect(mapStateToProps, mapDispatchToProps)(VisibilityDropDown);
