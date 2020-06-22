import {
  API_CREATE_USER_FAILURE,
  API_CREATE_USER_START,
  API_CREATE_USER_SUCCESS,
  API_DELETE_USER_FAILURE,
  API_DELETE_USER_START,
  API_DELETE_USER_SUCCESS,
  API_GET_USERS_FAILURE,
  API_GET_USERS_START,
  API_GET_USERS_SUCCESS,
  API_GET_USER_FAILURE,
  API_GET_USER_START,
  API_GET_USER_SUCCESS,
  API_UPDATE_USER_FAILURE,
  API_UPDATE_USER_START,
  API_UPDATE_USER_SUCCESS,
  API_GET_USER_POSTS_START,
  API_GET_USER_POSTS_SUCCESS,
  API_GET_USER_POSTS_FAILURE,
  API_GET_USER_TODOS_START,
  API_GET_USER_TODOS_SUCCESS,
  API_GET_USER_TODOS_FAILURE,
  RESET_USER_MUTATION_STATUS,
  SET_USER_SEARCH_KEYWORD,
  SET_USER_FILTERS,
} from "./post.actionTypes";

// REDUCER:
const initialPostState = {
  mutationStatus: {
    createPostStatus: null,
    updatePostStatus: null,
    deletePostStatus: null,
  },
  posts: {
    data: [],
    loading: false,
    error: null,
  },
  post: {
    data: {},
    loading: false,
    error: null,
  },
  postPosts: {
    data: [],
    loading: false,
    error: null,
  },
  postTodos: {
    data: [],
    loading: false,
    error: null,
  },
  searchKeyword: "",
  sortBy: "default",
  filters: null,
};

export const postReducer = (postState = initialPostState, action) => {
  switch (action.type) {
    case RESET_USER_MUTATION_STATUS:
      return {
        ...postState,
        mutationStatus: initialPostState.mutationStatus,
      };
    case SET_USER_SEARCH_KEYWORD:
      return {
        ...postState,
        searchKeyword: action.payload,
      };
    case SET_USER_FILTERS:
      return {
        ...postState,
        filters: action.payload,
      };
    case API_GET_USERS_START:
      return {
        ...postState,
        posts: {
          ...postState.posts,
          data: [],
          loading: true,
          error: null,
        },
      };
    case API_GET_USERS_SUCCESS:
      return {
        ...postState,
        posts: {
          ...postState.posts,
          data: action.payload.posts,
          loading: false,
          error: null,
        },
      };
    case API_GET_USERS_FAILURE:
      return {
        ...postState,
        posts: {
          ...postState.posts,
          loading: false,
          error: action.payload.error,
        },
      };
    case API_GET_USER_START:
      return {
        ...postState,
        post: {
          ...postState.post,
          data: {},
          loading: true,
          error: null,
        },
      };
    case API_GET_USER_SUCCESS:
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
    case API_GET_USER_FAILURE:
      return {
        ...postState,
        post: {
          ...postState.post,
          loading: false,
          error: action.payload,
        },
      };
    case API_CREATE_USER_START:
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
    case API_CREATE_USER_SUCCESS:
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
    case API_CREATE_USER_FAILURE:
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
    case API_UPDATE_USER_START:
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
    case API_UPDATE_USER_SUCCESS:
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
    case API_UPDATE_USER_FAILURE:
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
    case API_DELETE_USER_START:
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
    case API_DELETE_USER_SUCCESS:
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
    case API_DELETE_USER_FAILURE:
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
    case API_GET_USER_POSTS_START:
      return {
        ...postState,
        postPosts: {
          ...postState.postPosts,
          data: [],
          loading: true,
          error: null,
        },
      };
    case API_GET_USER_POSTS_SUCCESS:
      return {
        ...postState,
        postPosts: {
          ...postState.postPosts,
          data: action.payload.posts,
          loading: false,
          error: null,
        },
      };
    case API_GET_USER_POSTS_FAILURE:
      return {
        ...postState,
        postPosts: {
          ...postState.postPosts,
          loading: false,
          error: action.payload.error,
        },
      };
    case API_GET_USER_TODOS_START:
      return {
        ...postState,
        postTodos: {
          ...postState.postTodos,
          data: [],
          loading: true,
          error: null,
        },
      };
    case API_GET_USER_TODOS_SUCCESS:
      return {
        ...postState,
        postTodos: {
          ...postState.postTodos,
          data: action.payload.todos,
          loading: false,
          error: null,
        },
      };
    case API_GET_USER_TODOS_FAILURE:
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
