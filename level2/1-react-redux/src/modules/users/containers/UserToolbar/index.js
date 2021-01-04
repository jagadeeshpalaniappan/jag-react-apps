import React from "react";
import AddUser from "./AddUser";
import VisibilityDropDown from "./VisibilityFilterDropDown";
export default function UserToolbar() {
  return (
    <div className="d-flex justify-content-end my-2">
      <AddUser />
      <VisibilityDropDown />
    </div>
  );
}
