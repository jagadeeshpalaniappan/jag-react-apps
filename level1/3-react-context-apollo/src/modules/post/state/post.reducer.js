import {
  API_CREATE_POST_FAILURE,
  API_CREATE_POST_START,
  API_CREATE_POST_SUCCESS,
  API_DELETE_POST_FAILURE,
  API_DELETE_POST_START,
  API_DELETE_POST_SUCCESS,
  API_GET_POSTS_FAILURE,
  API_GET_POSTS_START,
  API_GET_POSTS_SUCCESS,
  API_GET_POST_START,
  API_GET_POST_SUCCESS,
  API_GET_POST_FAILURE,
  API_GET_POST_RESET,
  API_UPDATE_POST_FAILURE,
  API_UPDATE_POST_START,
  API_UPDATE_POST_SUCCESS,
  API_GET_POSTS_BY_USER_START,
  API_GET_POSTS_BY_USER_SUCCESS,
  API_GET_POSTS_BY_USER_FAILURE,
  API_GET_POST_AUTHOR_INFO_START,
  API_GET_POST_AUTHOR_INFO_SUCCESS,
  API_GET_POST_AUTHOR_INFO_FAILURE,
  API_GET_POST_AUTHOR_INFO_RESET,
  RESET_POST_MUTATION_STATUS,
  SET_POST_SEARCH_KEYWORD,
  SET_POST_FILTERS,
  API_GET_POST_FILTER_USERS_FAILURE,
  API_GET_POST_FILTER_USERS_START,
  API_GET_POST_FILTER_USERS_SUCCESS,
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
    case API_GET_POSTS_START:
      return {
        ...postState,
        posts: {
          ...postState.posts,
          data: {},
          loading: true,
          error: null,
        },
      };
    case API_GET_POSTS_SUCCESS:
      return {
        ...postState,
        posts: {
          ...postState.posts,
          data: action.payload.posts,
          loading: false,
          error: null,
        },
      };
    case API_GET_POSTS_FAILURE:
      return {
        ...postState,
        posts: {
          ...postState.posts,
          loading: false,
          error: action.payload.error,
        },
      };
    case API_GET_POST_START:
      return {
        ...postState,
        post: {
          ...postState.post,
          data: {},
          loading: true,
          error: null,
        },
      };
    case API_GET_POST_SUCCESS:
      return {
        ...postState,
        post: {
          ...postState.post,
          data: action.payload.post,
          loading: false,
          error: null,
        },
      };
    case API_GET_POST_FAILURE:
      return {
        ...postState,
        post: {
          ...postState.post,
          loading: false,
          error: action.payload,
        },
      };
    case API_GET_POST_RESET:
      return {
        ...postState,
        post: {
          ...initialPostState.post,
        },
      };
    case API_CREATE_POST_START:
      return {
        ...postState,
        mutationStatus: {
          ...initialPostState.mutationStatus,
          createPostStatus: {
            ...postState.createPostStatus,
            loading: true,
            error: null,
            success: false,
          },
        },
      };
    case API_CREATE_POST_SUCCESS:
      return {
        ...postState,
        mutationStatus: {
          ...postState.mutationStatus,
          createPostStatus: {
            ...postState.createPostStatus,
            loading: false,
            error: null,
            success: true,
          },
        },
      };
    case API_CREATE_POST_FAILURE:
      return {
        ...postState,
        mutationStatus: {
          ...postState.mutationStatus,
          createPostStatus: {
            ...postState.createPostStatus,
            loading: false,
            error: action.payload,
            success: false,
          },
        },
      };
    case API_UPDATE_POST_START:
      return {
        ...postState,
        mutationStatus: {
          ...initialPostState.mutationStatus,
          updatePostStatus: {
            ...postState.updatePostStatus,
            loading: true,
            error: null,
            success: false,
          },
        },
      };
    case API_UPDATE_POST_SUCCESS:
      return {
        ...postState,
        mutationStatus: {
          ...postState.mutationStatus,
          updatePostStatus: {
            ...postState.updatePostStatus,
            loading: false,
            error: null,
            success: true,
          },
        },
      };
    case API_UPDATE_POST_FAILURE:
      return {
        ...postState,
        mutationStatus: {
          ...postState.mutationStatus,
          updatePostStatus: {
            ...postState.updatePostStatus,
            loading: false,
            error: action.payload,
            success: false,
          },
        },
      };
    case API_DELETE_POST_START:
      return {
        ...postState,
        mutationStatus: {
          ...initialPostState.mutationStatus,
          deletePostStatus: {
            ...postState.deletePostStatus,
            loading: true,
            error: null,
            success: false,
          },
        },
      };
    case API_DELETE_POST_SUCCESS:
      return {
        ...postState,
        mutationStatus: {
          ...postState.mutationStatus,
          deletePostStatus: {
            ...postState.deletePostStatus,
            loading: false,
            error: null,
            success: true,
          },
        },
      };
    case API_DELETE_POST_FAILURE:
      return {
        ...postState,
        mutationStatus: {
          ...postState.mutationStatus,
          deletePostStatus: {
            ...postState.deletePostStatus,
            loading: false,
            error: action.payload,
            success: false,
          },
        },
      };
    case API_GET_POST_AUTHOR_INFO_START:
      return {
        ...postState,
        authorInfo: {
          ...postState.authorInfo,
          data: null,
          loading: true,
          error: null,
        },
      };
    case API_GET_POST_AUTHOR_INFO_SUCCESS:
      return {
        ...postState,
        authorInfo: {
          ...postState.authorInfo,
          data: action.payload.user,
          loading: false,
          error: null,
        },
      };
    case API_GET_POST_AUTHOR_INFO_FAILURE:
      return {
        ...postState,
        authorInfo: {
          ...postState.authorInfo,
          loading: false,
          error: action.payload.error || true,
        },
      };
    case API_GET_POST_AUTHOR_INFO_RESET:
      return {
        ...postState,
        authorInfo: {
          ...postState.authorInfo,
          data: {},
          loading: true,
          error: null,
        },
      };
    case API_GET_POSTS_BY_USER_START:
      return {
        ...postState,
        authorPosts: {
          ...postState.authorPosts,
          data: [],
          loading: true,
          error: null,
        },
      };
    case API_GET_POSTS_BY_USER_SUCCESS:
      return {
        ...postState,
        authorPosts: {
          ...postState.authorPosts,
          data: action.payload.posts,
          loading: false,
          error: null,
        },
      };
    case API_GET_POSTS_BY_USER_FAILURE:
      return {
        ...postState,
        authorPosts: {
          ...postState.authorPosts,
          loading: false,
          error: action.payload.error,
        },
      };
    case API_GET_POST_FILTER_USERS_START:
      return {
        ...postState,
        filterUsers: {
          ...postState.filterUsers,
          data: {},
          loading: true,
          error: null,
        },
      };
    case API_GET_POST_FILTER_USERS_SUCCESS:
      return {
        ...postState,
        filterUsers: {
          ...postState.filterUsers,
          data: action.payload.users,
          loading: false,
          error: null,
        },
      };
    case API_GET_POST_FILTER_USERS_FAILURE:
      return {
        ...postState,
        filterUsers: {
          ...postState.filterUsers,
          loading: false,
          error: action.payload.error,
        },
      };

    default:
      return postState;
  }
};
