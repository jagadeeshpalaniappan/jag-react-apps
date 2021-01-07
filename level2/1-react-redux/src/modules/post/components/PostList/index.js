import React, { useEffect } from "react";
import { connect } from "react-redux";
import { apiGetPostsAction } from "../../state/getPosts/actions";
import { getVisiblePosts } from "../../state/selectors";
import { PostListStatus } from "../PostStatus";
import List from "./List";

export const PostList = ({ apiGetPostsAction }) => {
  console.log("PostList");
  useEffect(() => {
    apiGetPostsAction();
  }, [apiGetPostsAction]);
  return (
    <>
      <PostListStatus />
      <List />
    </>
  );
};

const mapDispatchToProps = { apiGetPostsAction };
export default connect(null, mapDispatchToProps)(PostList);
