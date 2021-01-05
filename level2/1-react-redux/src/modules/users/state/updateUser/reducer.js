// REDUCERS:
export const apiUpdateUserStartReducer = (state, action) => {
  console.log("userReducer:apiUpdateUserStartReducer", { state, action });
  return {
    ...state,
    updateUserStatus: {
      ...state.updateUserStatus,
      success: false,
      loading: true,
      error: null,
    },
  };
};

export const apiUpdateUserSuccessReducer = (state, action) => {
  console.log("userReducer:apiUpdateUserSuccessReducer", { state, action });
  return {
    ...state,
    updateUserStatus: {
      ...state.updateUserStatus,
      success: true,
      loading: false,
      error: null,
    },
  };
};
export const apiUpdateUserFailureReducer = (state, action) => {
  console.log("userReducer:apiUpdateUserFailureReducer", { state, action });
  return {
    ...state,
    updateUserStatus: {
      ...state.updateUserStatus,
      success: false,
      loading: false,
      error: action.payload.error,
    },
  };
};

export const resetUpdateUserStatusReducer = (state, action) => {
  console.log("userReducer:resetUpdateUserStatusReducer", { state, action });
  return {
    ...state,
    updateUserStatus: {
      ...state.updateUserStatus,
      success: false,
      loading: false,
      error: null,
    },
  };
};
