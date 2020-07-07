import React from "react";
import PropTypes from "prop-types";

import { List } from "../../common/components";
import PostListItem from "./PostListItem";
import PostListPagination from "./PostListPagination";

const PostList = ({ posts, pagination }) => {
  console.log("### PostList:");
  return (
    <div>
      {posts && posts.length > 0 && (
        <>
          <List>
            {posts.map((post) => (
              <PostListItem key={post.id} item={post} action />
            ))}
          </List>

          {pagination && <PostListPagination pagination={pagination} />}
        </>
      )}
    </div>
  );
};

PostList.propTypes = {
  posts: PropTypes.array,
};

export default React.memo(PostList);
