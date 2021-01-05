// REDUCERS:
export const apiCreateUserStartReducer = (state, action) => {
  console.log("userReducer:apiCreateUserStartReducer", { state, action });
  return {
    ...state,
    createUserStatus: {
      ...state.createUserStatus,
      success: false,
      loading: true,
      error: null,
    },
  };
};

export const apiCreateUserSuccessReducer = (state, action) => {
  console.log("userReducer:apiCreateUserSuccessReducer", { state, action });
  return {
    ...state,
    createUserStatus: {
      ...state.createUserStatus,
      success: true,
      loading: false,
      error: null,
    },
  };
};
export const apiCreateUserFailureReducer = (state, action) => {
  console.log("userReducer:apiCreateUserFailureReducer", { state, action });
  return {
    ...state,
    createUserStatus: {
      ...state.createUserStatus,
      success: false,
      loading: false,
      error: action.payload.error,
    },
  };
};

export const resetCreateUserStatusReducer = (state, action) => {
  console.log("userReducer:resetCreateUserStatusReducer", { state, action });
  return {
    ...state,
    createUserStatus: {
      ...state.createUserStatus,
      success: false,
      loading: false,
      error: null,
    },
  };
};
