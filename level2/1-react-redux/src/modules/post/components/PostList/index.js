import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { apiGetPostsAction } from "../../state/getPosts/actions";
import { PostListStatus } from "../PostStatus";
import List from "./List";
import { searchObjVals } from "src/modules/common/utils";

export const PostList = ({ posts, apiGetPostsAction }) => {
  console.log("PostList");
  useEffect(() => {
    apiGetPostsAction();
  }, [apiGetPostsAction]);
  return (
    <>
      <PostListStatus />
      <List posts={posts} />
    </>
  );
};

const getPostMap = (state) => state.postState.postMap;
const getPostIds = (state) => state.postState.posts.data;
const getFilter = (state) => state.postState.filter;

// PERFORMANCE-ISSUE-FIXED: // created: MemoizedSelector
// 'posts.filter' will be called only if 'state.postState.posts.data' changes or 'state.postState.filter' changes
const getVisiblePosts = createSelector(
  [getPostIds, getFilter, getPostMap],
  (postIds, filter, postMap) => {
    return postIds.filter((postId) => {
      const post = postMap[postId];
      let activeMatched = true;
      if (filter.active === "Active") activeMatched = post.isActive;
      if (filter.active === "InActive") activeMatched = !post.isActive;
      if (filter.active === "All") activeMatched = true;

      let searchMatched = true;
      if (activeMatched && filter.search)
        searchMatched = searchObjVals(post, filter.search);

      return searchMatched && activeMatched;
    });
  }
);

const mapStateToProps = (state) => ({ posts: getVisiblePosts(state) });
const mapDispatchToProps = { apiGetPostsAction };
export default connect(mapStateToProps, mapDispatchToProps)(PostList);
