import React, { memo } from "react";
import ListItem from "./ListItem";

const List = memo(function List({ posts }) {
  return (
    <ul className="list-group">
      {posts && posts.map((post) => <ListItem key={post.id} post={post} />)}
    </ul>
  );
});

export default List;
