// REDUCERS:
export const apiUpdatePostStartReducer = (state, action) => {
  console.log("postReducer:apiUpdatePostStartReducer", { state, action });
  return {
    ...state,
    updatePostStatus: {
      ...state.updatePostStatus,
      success: false,
      loading: true,
      error: null,
    },
  };
};

export const apiUpdatePostSuccessReducer = (state, action) => {
  console.log("postReducer:apiUpdatePostSuccessReducer", { state, action });
  const updatedPost = action.payload;
  state.postMap[updatedPost.id] = updatedPost;
  return {
    ...state,
    updatePostStatus: {
      ...state.updatePostStatus,
      success: true,
      loading: false,
      error: null,
    },
  };
};
export const apiUpdatePostFailureReducer = (state, action) => {
  console.log("postReducer:apiUpdatePostFailureReducer", { state, action });
  return {
    ...state,
    updatePostStatus: {
      ...state.updatePostStatus,
      success: false,
      loading: false,
      error: action.payload.error,
    },
  };
};

export const resetUpdatePostStatusReducer = (state, action) => {
  console.log("postReducer:resetUpdatePostStatusReducer", { state, action });
  return {
    ...state,
    updatePostStatus: {
      ...state.updatePostStatus,
      success: false,
      loading: false,
      error: null,
    },
  };
};
