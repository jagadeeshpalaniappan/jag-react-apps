// REDUCERS:
export const apiDeletePostStartReducer = (state, action) => {
  console.log("postReducer:apiDeletePostStartReducer", { state, action });
  return {
    ...state,
    deletePostStatus: {
      ...state.deletePostStatus,
      success: false,
      loading: true,
      error: null,
    },
  };
};

export const apiDeletePostSuccessReducer = (state, action) => {
  console.log("postReducer:apiDeletePostSuccessReducer", { state, action });
  const deletedPost = action.payload;
  return {
    ...state,
    postMap: {
      ...state.postMap,
      [deletedPost.id]: null,
    },
    posts: {
      ...state.posts,
      data: state.posts.data.filter((postId) => postId !== deletedPost.id),
    },
    deletePostStatus: {
      ...state.deletePostStatus,
      success: true,
      loading: false,
      error: null,
    },
  };
};
export const apiDeletePostFailureReducer = (state, action) => {
  console.log("postReducer:apiDeletePostFailureReducer", { state, action });
  return {
    ...state,
    deletePostStatus: {
      ...state.deletePostStatus,
      success: false,
      loading: false,
      error: action.payload.error,
    },
  };
};

export const resetDeletePostStatusReducer = (state, action) => {
  console.log("postReducer:resetDeletePostStatusReducer", { state, action });
  return {
    ...state,
    deletePostStatus: {
      ...state.deletePostStatus,
      success: false,
      loading: false,
      error: null,
    },
  };
};
