import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Input } from "reactstrap";
import debounce from "lodash.debounce";

const SearchInput = ({ value, placeholder, onChange }) => {
  console.log("### SearchInput:", value);
  const [searchVal, setSearchVal] = useState(value);

  const onChangeDebounced = useCallback(
    debounce((newSearchVal) => {
      console.log("onChangeDebounced:", newSearchVal);
      onChange(newSearchVal);
    }, 500),
    [debounce]
  );

  const handleChange = (e) => {
    console.log("handleChange:", e.target.value);
    setSearchVal(e.target.value);
    onChangeDebounced(e.target.value);
  };
  return (
    <Input
      type="text"
      name="searchItem"
      value={searchVal}
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
};

SearchInput.propTypes = {
  onChange: PropTypes.func,
};

export default React.memo(SearchInput);
