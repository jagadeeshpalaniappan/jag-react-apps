import React from "react";
import Search from "./Search";
import AddButton from "./AddButton";
import ActiveFilterDropDown from "./ActiveFilterDropDown";
export default function PostToolbar() {
  return (
    <>
      <div className="d-flex justify-content-end my-2">
        <AddButton />
        <ActiveFilterDropDown />
      </div>
      <Search />
    </>
  );
}
