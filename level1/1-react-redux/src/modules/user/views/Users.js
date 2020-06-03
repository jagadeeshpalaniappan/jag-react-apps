import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import StatusQueryLoading from "../../common/components/StatusQueryLoading";
import StatusQueryError from "../../common/components/StatusQueryError";
import {
  getUsersAction,
  setUserSearchKeywordAction,
} from "../state/user.action";

import UsersList from "../components/UsersList";
import UsersToolbar from "../components/UsersToolbar";
import UserLayout from "../layout/UserLayout";
import SearchInput from "../../common/components/SearchInput";
import { filterItemsByVal } from "../../common/utils/search.utils";

// const users = [{ id: 101, name: "Jag1" }];

const Users = ({
  users,
  loading,
  error,
  searchKeyword,
  searchUser,
  getUsers,
}) => {
  useEffect(() => {
    // onInit:
    getUsers();
  }, [getUsers]);

  const handleSearch = (e, keyword) => {
    console.log("handleSearch: ", { keyword });
    searchUser(keyword);
  };

  const handleRetry = () => getUsers();

  return (
    <UserLayout title="Users" actions={<UsersToolbar />}>
      <div className="my-3">
        <SearchInput placeholder="Search user" onChange={handleSearch} />
      </div>
      <StatusQueryLoading loading={loading} text="Loading users" />
      <StatusQueryError
        error={error}
        text="Error while getting users"
        onRetry={handleRetry}
      />
      <UsersList users={users} />
    </UserLayout>
  );
};

Users.propTypes = {
  users: PropTypes.array.isRequired,
  getUsers: PropTypes.func.isRequired,
};

const getFilteredUsers = (users, keyword) => {
  console.log("getFilteredUsers:", { users, keyword });
  const filteredUsers = filterItemsByVal(users, keyword);
  console.log("getFilteredUsers: after", { filteredUsers, keyword });
  return filteredUsers;
};

const mapStateToProps = (state) => {
  console.log(state);
  const { loading, error, data } = state.userState.users;
  return {
    loading,
    error,
    users: getFilteredUsers(data, state.userState.searchKeyword),
    searchKeyword: state.userState.searchKeyword,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: () => dispatch(getUsersAction()),
    searchUser: (keyword) => dispatch(setUserSearchKeywordAction(keyword)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
