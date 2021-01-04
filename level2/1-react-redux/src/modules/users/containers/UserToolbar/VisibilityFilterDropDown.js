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
  visibilityFilterActive,
  setVisibilityFilterAction,
}) => {
  const [ddOpen, setDdOpen] = useState(false);
  return (
    <Dropdown isOpen={ddOpen} toggle={() => setDdOpen(!ddOpen)}>
      <DropdownToggle caret>Show {visibilityFilterActive}</DropdownToggle>
      <DropdownMenu right>
        <DropdownItem
          onClick={() => setVisibilityFilterAction({ active: "All" })}
          className={
            visibilityFilterActive === "All" ? "bg-primary text-white" : ""
          }
        >
          All
        </DropdownItem>
        <DropdownItem
          onClick={() => setVisibilityFilterAction({ active: "Active" })}
          className={
            visibilityFilterActive === "Active" ? "bg-primary text-white" : ""
          }
        >
          Active
        </DropdownItem>
        <DropdownItem
          onClick={() => setVisibilityFilterAction({ active: "InActive" })}
          className={
            visibilityFilterActive === "InActive" ? "bg-primary text-white" : ""
          }
        >
          InActive
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

const mapStateToProps = (state) => ({
  visibilityFilterActive: state.userState.visibilityFilter.active,
});

const mapDispatchToProps = { setVisibilityFilterAction };
export default connect(mapStateToProps, mapDispatchToProps)(VisibilityDropDown);
