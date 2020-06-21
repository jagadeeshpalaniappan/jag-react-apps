import React from "react";
import PropTypes from "prop-types";

import { List } from "../../common/components";
import UserListItem from "./UserListItem";
import UserListPagination from "./UserListPagination";

const UserList = ({ users, pagination, onPrevPage, onNextPage }) => {
  console.log("### UserList:");
  return (
    <div>
      {users && users.length > 0 && (
        <>
          <List>
            {users.map((user) => (
              <UserListItem key={user.id} item={user} action />
            ))}
          </List>

          <UserListPagination
            pagination={pagination}
            onPrevPage={onPrevPage}
            onNextPage={onNextPage}
          />
        </>
      )}
    </div>
  );
};

UserList.propTypes = {
  users: PropTypes.array,
};

export default React.memo(UserList);
