import {
  RESET_POST_MUTATION_STATUS,
  SET_POST_FILTERS,
  SET_POST_SEARCH_KEYWORD,
} from "./post.actionTypes";

// REDUCER:
export const initialPostState = {
  mutationStatus: {
    createPostStatus: null,
    updatePostStatus: null,
    deletePostStatus: null,
  },
  posts: {
    data: {},
    loading: false,
    error: null,
  },
  post: {
    data: {},
    loading: false,
    error: null,
  },
  authorPosts: {
    data: {},
    loading: false,
    error: null,
  },
  authorInfo: {
    data: null,
    loading: false,
    error: null,
  },
  searchKeyword: "",
  sortBy: "default",
  filters: null,
  filterUsers: {
    data: {},
    loading: false,
    error: null,
  },
};

export const postReducer = (postState = initialPostState, action) => {
  switch (action.type) {
    case RESET_POST_MUTATION_STATUS:
      return {
        ...postState,
        mutationStatus: initialPostState.mutationStatus,
      };
    case SET_POST_SEARCH_KEYWORD:
      return {
        ...postState,
        searchKeyword: action.payload,
      };
    case SET_POST_FILTERS:
      return {
        ...postState,
        filters: action.payload,
      };
    default:
      return postState;
  }
};
