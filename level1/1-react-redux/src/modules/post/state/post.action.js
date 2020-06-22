// Minimalistic Approach :: (I personally dont like this approach)
// import { apiGetPostsAction, apiCreatePostAction, apiUpdatePostAction, apiDeletePostAction } from "./api/post.all.api.action";

// Recommended Approach (I personally like this approach)
import { apiGetPostsAction } from "./api/post.getPosts.action";
import { apiGetPostAction } from "./api/post.getPost.action";
import { apiCreatePostAction } from "./api/post.createPost.action";
import { apiUpdatePostAction } from "./api/post.updatePost.action";
import { apiDeletePostAction } from "./api/post.deletePost.action";

import {
  RESET_USER_MUTATION_STATUS,
  SET_USER_SEARCH_KEYWORD,
  SET_USER_FILTERS,
} from "./post.actionTypes";

// LOCAL-ACTIONS:

// export const setModalPostAction = (post) => {
//   return { type: SET_MODAL_USER, payload: post };
// };

export const resetMutationStatusAction = () => {
  return { type: RESET_USER_MUTATION_STATUS };
};

export const setPostSearchKeywordAction = (keyword) => {
  return { type: SET_USER_SEARCH_KEYWORD, payload: keyword };
};

export const setPostFiltersAction = (payload) => {
  return { type: SET_USER_FILTERS, payload };
};

// API-ACTIONS:

export const getPostsAction = (config) => {
  return apiGetPostsAction(config);
};

export const getPostAction = (post) => {
  return apiGetPostAction(post);
};

export const getPostPostsAction = (post) => {
  return apiGetPostAction(post);
};

export const createPostAction = (post) => {
  return apiCreatePostAction(post);
};

export const updatePostAction = (post) => {
  return apiUpdatePostAction(post);
};

export const deletePostAction = (post) => {
  return apiDeletePostAction(post);
};
