import React, { useState } from "react";
import { connect } from "react-redux";
import { debounce } from "lodash-es";
import { setFilterAction } from "../../state/filter/actions";
import { getFilter } from "../../state/selectors";

export const Search = ({ search, searchPost }) => {
  const [searchState, setSearchState] = useState(search || "");
  const onSearch = (e) => {
    setSearchState(e.target.value);
    searchPost({ search: e.target.value });
  };

  return (
    <input
      type="text"
      className="form-control bg-transparent my-2"
      id="searchPost"
      placeholder="Search"
      value={searchState}
      onChange={onSearch}
    />
  );
};

const mapStateToProps = (state) => ({
  search: getFilter(state).search,
});

const mapDispatchToProps = (dispatch) => {
  const searchPostDebounced = debounce((...args) => {
    dispatch(setFilterAction(...args));
  }, 500);
  return {
    searchPost: searchPostDebounced,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
