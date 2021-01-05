// REDUCERS:
export const apiDeleteUserStartReducer = (state, action) => {
  console.log("userReducer:apiDeleteUserStartReducer", { state, action });
  return {
    ...state,
    deleteUserStatus: {
      ...state.deleteUserStatus,
      success: false,
      loading: true,
      error: null,
    },
  };
};

export const apiDeleteUserSuccessReducer = (state, action) => {
  console.log("userReducer:apiDeleteUserSuccessReducer", { state, action });
  return {
    ...state,
    deleteUserStatus: {
      ...state.deleteUserStatus,
      success: true,
      loading: false,
      error: null,
    },
  };
};
export const apiDeleteUserFailureReducer = (state, action) => {
  console.log("userReducer:apiDeleteUserFailureReducer", { state, action });
  return {
    ...state,
    deleteUserStatus: {
      ...state.deleteUserStatus,
      success: false,
      loading: false,
      error: action.payload.error,
    },
  };
};

export const resetDeleteUserStatusReducer = (state, action) => {
  console.log("userReducer:resetDeleteUserStatusReducer", { state, action });
  return {
    ...state,
    deleteUserStatus: {
      ...state.deleteUserStatus,
      success: false,
      loading: false,
      error: null,
    },
  };
};
