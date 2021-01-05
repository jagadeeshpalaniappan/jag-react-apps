import React, { useState } from "react";
import { connect } from "react-redux";
import { debounce } from "lodash-es";
import { setFilterAction } from "../../state/filter/actions";

export const Search = ({ search, searchUser }) => {
  const [searchState, setSearchState] = useState(search || "");
  const onSearch = (e) => {
    setSearchState(e.target.value);
    searchUser({ search: e.target.value });
  };

  return (
    <input
      type="text"
      className="form-control bg-transparent my-2"
      id="searchUser"
      placeholder="Search"
      value={searchState}
      onChange={onSearch}
    />
  );
};

const mapStateToProps = (state) => ({
  search: state.userState.filter.search,
});

const mapDispatchToProps = (dispatch) => {
  const searchUserDebounced = debounce((...args) => {
    dispatch(setFilterAction(...args));
  }, 500);
  return {
    searchUser: searchUserDebounced,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
