import React from "react";
import PropTypes from "prop-types";
import { Input } from "reactstrap";

// value={searchKeyword}
// placeholder="Search user"
// onChange={handleSearch}

const SearchInput = ({ value, placeholder, onChange }) => {
  console.log("### SearchInput:");
  const handleChange = (e) => {
    // TODO: handle debounce
    onChange(e, e.target.value);
  };
  return (
    <Input
      type="text"
      name="searchItem"
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
};

SearchInput.propTypes = {
  onChange: PropTypes.func,
};

export default React.memo(SearchInput);
