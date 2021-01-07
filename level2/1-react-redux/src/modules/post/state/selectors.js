import { createSelector } from "reselect";
import { searchObjVals } from "src/modules/common/utils";

export const getPostMap = (state) => state.postState.postMap;
export const getPostIds = (state) => state.postState.postIds;
export const getFilter = (state) => state.postState.filter;
export const getPostModal = (state) => state.postState.postModal;

export const getCreatePostStatus = (state) => state.postState.createPostStatus;
export const getUpdatePostStatus = (state) => state.postState.updatePostStatus;
export const getDeletePostStatus = (state) => state.postState.deletePostStatus;
export const getPostStatus = (state) => state.postState.getPostsStatus;

// PERFORMANCE-ISSUE-FIXED: // created: MemoizedSelector
// 'posts.filter' will be called only if 'state.postState.posts.data' changes or 'state.postState.filter' changes
export const getVisiblePosts = createSelector(
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
