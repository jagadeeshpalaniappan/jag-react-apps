import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { useQueryParam } from "../../common/hooks";

const PostSortDropdown = () => {
  console.log("### PostSortDropdown:");
  let query = useQueryParam();
  var history = useHistory();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const sortBy = query.get("sortBy");
  const handleChange = (newSortBy) => {
    if (sortBy !== newSortBy) {
      query.set("sortBy", newSortBy);
      history.push({ search: query.toString() });
    }
  };

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
          active={sortBy === "title"}
          onClick={() => handleChange("title")}
        >
          Title
        </DropdownItem>
        <DropdownItem
          active={sortBy === "viewCount"}
          onClick={() => handleChange("viewCount")}
        >
          View Count
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

PostSortDropdown.propTypes = {};
export default React.memo(PostSortDropdown);
