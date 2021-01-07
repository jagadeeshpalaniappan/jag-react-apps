import React, { memo } from "react";
import ListItem from "./ListItem";

const List = memo(function List({ posts }) {
  return (
    <ul className="list-group">
      {posts &&
        posts.map((postId) => <ListItem key={postId} postId={postId} />)}
    </ul>
  );
});

export default List;
