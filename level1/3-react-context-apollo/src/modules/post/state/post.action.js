// import { apiGetPostFilterUsersAction } from "./api/post.getPostFilterUsers.action.js";

import {
  RESET_POST_MUTATION_STATUS,
  SET_POST_FILTERS,
  SET_POST_SEARCH_KEYWORD,
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
