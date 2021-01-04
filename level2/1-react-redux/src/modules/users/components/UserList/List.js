import React, { memo } from "react";
import ListItem from "./ListItem";

const List = memo(function List({ users }) {
  return (
    <ul className="list-group">
      {users && users.map((user) => <ListItem key={user.id} user={user} />)}
    </ul>
  );
});

export default List;
