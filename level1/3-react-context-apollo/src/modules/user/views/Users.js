import { useLazyQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React, { useCallback, useEffect } from "react";
import { connectAppContext } from "../../../store/AppContext";
import SearchInput from "../../common/components/SearchInput";
import StatusQueryError from "../../common/components/StatusQueryError";
import StatusQueryLoading from "../../common/components/StatusQueryLoading";
import { useQueryParam } from "../../common/hooks";
import { arrToMap, deepEqualReact } from "../../common/utils/all.utils";
import UsersList from "../components/UsersList";
import UsersToolbar from "../components/UsersToolbar";
import UserLayout from "../layout/UserLayout";
import { setUserSearchKeywordAction } from "../state/user.action";

const DEFAULT_PAGINATION = 10;

const GET_USERS = gql`
  query($options: UsersQueryOptions) {
    users(options: $options) {
      data {
        id
        name
        username
        sex
        role
        isActive
      }
      meta {
        before
        after
      }
    }
  }
`;

const Users = (props) => {
  console.log("### Users:", props);

  const { searchKeyword, filters, searchUser, getUsers } = props;
  let query = useQueryParam();
  const sortBy = query.get("sortBy");
  const pageSize = query.get("pageSize");
  const pageAfter = query.get("pageAfter");
  const pageBefore = query.get("pageBefore");

  // const [appState, dispatch] = useAppState();
  // console.log("Users:", { appState }); // TODO: why calling two times?

  const filtersMap = arrToMap(filters || []);
  const filterBy = {};
  if (filtersMap.sex) filterBy.sex = filtersMap.sex;
  if (filtersMap.role) filterBy.role = filtersMap.role;
  if (filtersMap.isActive) filterBy.isActive = filtersMap.isActive === "active";

  // GRAPHQL
  const variables = {
    options: {
      filterBy,
      search: searchKeyword,
      sort: sortBy,
      pagination: {
        size: Number(pageSize) || DEFAULT_PAGINATION,
        before: pageBefore,
        after: pageAfter,
      },
    },
  };
  const [loadUsers, { loading, error, data }] = useLazyQuery(GET_USERS, {
    variables,
  });
  const users = data ? data.users.data : [];
  const pagination = data ? data.users.meta : {};

  console.log("UserList:", { loading, error, data, pagination, filtersMap });

  useEffect(() => {
    console.log("Users:initApi:");
    loadUsers();
  }, [
    getUsers,
    sortBy,
    pageSize,
    searchKeyword,
    filters,
    pageBefore,
    pageAfter,
  ]);

  const handleRetry = useCallback(() => {
    console.log("handleRetry: ");
    loadUsers();
  }, [loadUsers]);

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

Users.propTypes = {};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    searchKeyword: state.userState.searchKeyword,
    filters: state.userState.filters,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    searchUser: (keyword) => dispatch(setUserSearchKeywordAction(keyword)),
  };
};

// only re-render ExpensiveComponent when the props have deeply changed
const UsersMemoized = React.memo(Users, deepEqualReact);

export default connectAppContext(
  mapStateToProps,
  mapDispatchToProps,
  UsersMemoized
);
