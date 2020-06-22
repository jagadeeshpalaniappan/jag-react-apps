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
  API_GET_POST_FAILURE,
  API_GET_POST_START,
  API_GET_POST_SUCCESS,
  API_UPDATE_POST_FAILURE,
  API_UPDATE_POST_START,
  API_UPDATE_POST_SUCCESS,
  API_GET_POST_POSTS_START,
  API_GET_POST_POSTS_SUCCESS,
  API_GET_POST_POSTS_FAILURE,
  API_GET_POST_TODOS_START,
  API_GET_POST_TODOS_SUCCESS,
  API_GET_POST_TODOS_FAILURE,
  RESET_POST_MUTATION_STATUS,
  SET_POST_SEARCH_KEYWORD,
  SET_POST_FILTERS,
} from "./post.actionTypes";

// REDUCER:
const initialPostState = {
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
  postPosts: {
    data: {},
    loading: false,
    error: null,
  },
  postTodos: {
    data: {},
    loading: false,
    error: null,
  },
  searchKeyword: "",
  sortBy: "default",
  filters: null,
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
        // postPosts: {
        //   ...postState.postPosts,
        //   data: action.payload.posts,
        //   loading: false,
        //   error: null,
        // },
        // postTodos: {
        //   ...postState.postTodos,
        //   data: action.payload.todos,
        //   loading: false,
        //   error: null,
        // },
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
    case API_GET_POST_POSTS_START:
      return {
        ...postState,
        postPosts: {
          ...postState.postPosts,
          data: [],
          loading: true,
          error: null,
        },
      };
    case API_GET_POST_POSTS_SUCCESS:
      return {
        ...postState,
        postPosts: {
          ...postState.postPosts,
          data: action.payload.posts,
          loading: false,
          error: null,
        },
      };
    case API_GET_POST_POSTS_FAILURE:
      return {
        ...postState,
        postPosts: {
          ...postState.postPosts,
          loading: false,
          error: action.payload.error,
        },
      };
    case API_GET_POST_TODOS_START:
      return {
        ...postState,
        postTodos: {
          ...postState.postTodos,
          data: [],
          loading: true,
          error: null,
        },
      };
    case API_GET_POST_TODOS_SUCCESS:
      return {
        ...postState,
        postTodos: {
          ...postState.postTodos,
          data: action.payload.todos,
          loading: false,
          error: null,
        },
      };
    case API_GET_POST_TODOS_FAILURE:
      return {
        ...postState,
        postTodos: {
          ...postState.postTodos,
          loading: false,
          error: action.payload.error,
        },
      };
    default:
      return postState;
  }
};
