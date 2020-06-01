import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import LoadingIndicator from "../../common/components/LoadingIndicator";
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

const Users = ({ users, status, searchKeyword, searchUser, getUsers }) => {
  useEffect(() => {
    // onInit:
    getUsers();
  }, [getUsers]);

  const handleSearch = (e, keyword) => {
    console.log("handleSearch: ", { keyword });
    searchUser(keyword);
  };

  return (
    <UserLayout title="Users" actions={<UsersToolbar />}>
      <div className="my-3">
        <SearchInput placeholder="Search user" onChange={handleSearch} />
      </div>
      <LoadingIndicator status={status} />
      <UsersList users={users} />
    </UserLayout>
  );
};

Users.propTypes = {
  users: PropTypes.array.isRequired,
  status: PropTypes.object.isRequired,
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
  return {
    status: state.userState.users.status,
    // users: state.userState.users.data,
    users: getFilteredUsers(
      state.userState.users.data,
      state.userState.searchKeyword
    ),
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
