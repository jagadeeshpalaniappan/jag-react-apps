import PropTypes from "prop-types";
import React, { useCallback, useEffect } from "react";
import { connect } from "react-redux";
import SearchInput from "../../common/components/SearchInput";
import StatusQueryError from "../../common/components/StatusQueryError";
import StatusQueryLoading from "../../common/components/StatusQueryLoading";
import { useQueryParam } from "../../common/hooks";
import { deepEqualReact } from "../../common/utils/all.utils";
import UsersList from "../components/UsersList";
import UsersToolbar from "../components/UsersToolbar";
import UserLayout from "../layout/UserLayout";
import {
  getUsersAction,
  setUserSearchKeywordAction,
} from "../state/user.action";

const Users = (props) => {
  console.log("### Users:", props);
  const {
    users,
    loading,
    error,
    pagination,
    searchKeyword,
    filters,
    searchUser,
    getUsers,
  } = props;
  let query = useQueryParam();
  const sortBy = query.get("sortBy");
  const pageSize = query.get("pageSize");
  const pageAfter = query.get("pageAfter");
  const pageBefore = query.get("pageBefore");

  const initApi = useCallback(() => {
    console.log("Users:initApi:");
    getUsers({
      sortBy,
      filters,
      searchBy: searchKeyword,
      pageSize,
      pageBefore,
      pageAfter,
    });
  }, [
    getUsers,
    sortBy,
    pageSize,
    searchKeyword,
    filters,
    pageBefore,
    pageAfter,
  ]);

  useEffect(() => {
    console.log("Users:onInit:");
    initApi();
  }, [initApi]);

  const handleRetry = useCallback(() => {
    console.log("handleRetry: ");
    initApi(pagination);
  }, [initApi, pagination]);

  const handleSearch = useCallback(
    (keyword) => {
      console.log("handleSearch: ", { keyword });
      searchUser(keyword);
    },
    [searchUser]
  );

  return (
    <UserLayout title="Users" actions={<UsersToolbar />}>
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
      <UsersList users={users} pagination={pagination} />
    </UserLayout>
  );
};

Users.propTypes = {
  users: PropTypes.array,
  getUsers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  console.log(state);
  const { loading, error, data } = state.userState.users;
  const { data: users, pagination } = data;
  return {
    loading,
    error,
    users, // SERVER-SEARCH
    pagination,
    searchKeyword: state.userState.searchKeyword,
    filters: state.userState.filters,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: (config) => dispatch(getUsersAction(config)),
    searchUser: (keyword) => dispatch(setUserSearchKeywordAction(keyword)),
  };
};

// only re-render ExpensiveComponent when the props have deeply changed
const UsersMemoized = React.memo(Users, deepEqualReact);
export default connect(mapStateToProps, mapDispatchToProps)(UsersMemoized);
