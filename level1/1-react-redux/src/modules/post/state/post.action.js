// Minimalistic Approach :: (I personally dont like this approach)
// import { apiGetPostsAction, apiCreatePostAction, apiUpdatePostAction, apiDeletePostAction } from "./api/post.all.api.action";

// Recommended Approach (I personally like this approach)
import { apiGetPostsAction } from "./api/post.getPosts.action";
import { apiGetPostAction } from "./api/post.getPost.action";
import { apiCreatePostAction } from "./api/post.createPost.action";
import { apiUpdatePostAction } from "./api/post.updatePost.action";
import { apiDeletePostAction } from "./api/post.deletePost.action";

import {
  RESET_POST_MUTATION_STATUS,
  SET_POST_SEARCH_KEYWORD,
  SET_POST_FILTERS,
} from "./post.actionTypes";

// LOCAL-ACTIONS:

// export const setModalPostAction = (post) => {
//   return { type: SET_MODAL_POST, payload: post };
// };

export const resetMutationStatusAction = () => {
  return { type: RESET_POST_MUTATION_STATUS };
};

export const setPostSearchKeywordAction = (keyword) => {
  return { type: SET_POST_SEARCH_KEYWORD, payload: keyword };
};

export const setPostFiltersAction = (payload) => {
  return { type: SET_POST_FILTERS, payload };
};

// API-ACTIONS:

export const getPostsAction = (config) => {
  return apiGetPostsAction(config);
};

export const getPostAction = (post) => {
  return apiGetPostAction(post);
};

export const getPostsByUserIdAction = (post) => {
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
