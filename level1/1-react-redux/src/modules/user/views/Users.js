import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import SearchInput from "../../common/components/SearchInput";
import StatusQueryError from "../../common/components/StatusQueryError";
import StatusQueryLoading from "../../common/components/StatusQueryLoading";
import { useQueryParam } from "../../common/hooks";
import UsersList from "../components/UsersList";
import UsersToolbar from "../components/UsersToolbar";
import UserLayout from "../layout/UserLayout";
import {
  getUsersAction,
  setUserSearchKeywordAction,
  setUserFiltersAction,
} from "../state/user.action";

// const users = [{ id: 101, name: "Jag1" }];

const Users = ({
  users,
  loading,
  error,
  page,
  searchKeyword,
  filters,
  searchUser,
  setFilters,
  getUsers,
}) => {
  let query = useQueryParam();
  const sortBy = query.get("sortBy");
  const pageSize = query.get("pageSize");
  const filterRole = query.get("filter.role");
  console.log({ filterRole });

  useEffect(() => {
    // onInit:
    getUsers({
      sortBy,
      pageSize,
      searchBy: searchKeyword,
    });
  }, [getUsers, sortBy, pageSize, searchKeyword]);

  const handleSearch = (e, keyword) => {
    console.log("handleSearch: ", { keyword });
    searchUser(keyword);
  };
  const handleRetry = () => {
    getUsers({
      sortBy,
      pageSize,
      pageBefore: page && page.before,
      pageAfter: page && page.after,
      searchBy: searchKeyword,
    });
  };

  // PAGINATION:
  const getPrevPageUsers = () => {
    getUsers({
      sortBy,
      pageSize,
      pageBefore: page.before,
      searchBy: searchKeyword,
    });
  };
  const getNextPageUsers = () => {
    getUsers({
      sortBy,
      pageSize,
      pageAfter: page.after,
      searchBy: searchKeyword,
    });
  };

  const handleFilter = (newFilters) => {
    console.log("newFilters", newFilters);
    setFilters(newFilters);
  };

  return (
    <UserLayout
      title="Users"
      actions={<UsersToolbar filters={filters} onFilter={handleFilter} />}
    >
      <div className="my-3">
        <SearchInput
          value={searchKeyword}
          placeholder="Search user"
          onChange={handleSearch}
        />
      </div>
      <StatusQueryLoading loading={loading} text="Loading users" />
      <StatusQueryError
        error={error}
        text="Error while getting users"
        onRetry={handleRetry}
      />
      <UsersList
        users={users}
        page={page}
        onPrevPage={getPrevPageUsers}
        onNextPage={getNextPageUsers}
      />
    </UserLayout>
  );
};

Users.propTypes = {
  users: PropTypes.array,
  getUsers: PropTypes.func.isRequired,
};

/*
const getFilteredUsers = (users, keyword) => {
  console.log("getFilteredUsers:", { users, keyword });
  const filteredUsers = filterItemsByVal(users, keyword);
  console.log("getFilteredUsers: after", { filteredUsers, keyword });
  return filteredUsers;
};
*/

const mapStateToProps = (state) => {
  console.log(state);
  const { loading, error, data } = state.userState.users;
  const { data: users, page } = data;
  return {
    loading,
    error,
    // users: getFilteredUsers(data, state.userState.searchKeyword), // LOCAL-SEARCH
    users, // SERVER-SEARCH
    page,
    searchKeyword: state.userState.searchKeyword,
    filters: state.userState.filters,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: (config) => dispatch(getUsersAction(config)),
    searchUser: (keyword) => dispatch(setUserSearchKeywordAction(keyword)),
    setFilters: (filters) => dispatch(setUserFiltersAction(filters)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
