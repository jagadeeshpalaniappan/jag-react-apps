// REDUCERS:
export const apiGetPostsStartReducer = (state, action) => {
  console.log("postReducer:apiGetPostsStartReducer", { state, action });
  return {
    ...state,
    posts: {
      ...state.posts,
      loading: true,
      error: null,
    },
  };
};
export const apiGetPostsSuccessReducer = (state, action) => {
  console.log("postReducer:apiGetPostsSuccessReducer", { state, action });
  return {
    ...state,
    posts: {
      ...state.posts,
      data: action.payload.data,
      loading: false,
      error: null,
    },
  };
};
export const apiGetPostsFailureReducer = (state, action) => {
  console.log("postReducer:apiGetPostsFailureReducer", { state, action });
  return {
    ...state,
    posts: {
      ...state.posts,
      loading: false,
      error: action.payload.error,
    },
  };
};
