import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { useQueryParam } from "../../common/hooks";

const PageSizeDropdown = () => {
  console.log("### PageSizeDropdown:");
  let query = useQueryParam();
  var history = useHistory();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const pageSize = query.get("pageSize");
  const handleChange = (newPageSize) => {
    if (pageSize !== newPageSize) {
      query.set("pageSize", newPageSize); // update: newPageSize
      history.push({ search: query.toString() });
    }
  };

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

PageSizeDropdown.propTypes = {};
export default React.memo(PageSizeDropdown);
