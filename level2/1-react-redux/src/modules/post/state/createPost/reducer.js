// REDUCERS:
export const apiCreatePostStartReducer = (state, action) => {
  console.log("postReducer:apiCreatePostStartReducer", { state, action });
  return {
    ...state,
    createPostStatus: {
      ...state.createPostStatus,
      success: false,
      loading: true,
      error: null,
    },
  };
};

export const apiCreatePostSuccessReducer = (state, action) => {
  console.log("postReducer:apiCreatePostSuccessReducer", { state, action });
  return {
    ...state,
    createPostStatus: {
      ...state.createPostStatus,
      success: true,
      loading: false,
      error: null,
    },
  };
};
export const apiCreatePostFailureReducer = (state, action) => {
  console.log("postReducer:apiCreatePostFailureReducer", { state, action });
  return {
    ...state,
    createPostStatus: {
      ...state.createPostStatus,
      success: false,
      loading: false,
      error: action.payload.error,
    },
  };
};

export const resetCreatePostStatusReducer = (state, action) => {
  console.log("postReducer:resetCreatePostStatusReducer", { state, action });
  return {
    ...state,
    createPostStatus: {
      ...state.createPostStatus,
      success: false,
      loading: false,
      error: null,
    },
  };
};
