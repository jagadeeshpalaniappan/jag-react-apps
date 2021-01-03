// REDUCERS:
export const apiGetUsersStartReducer = (state, action) => {
  console.log("userReducer:apiGetUsersStartReducer", { state, action });
  return {
    ...state,
    users: {
      ...state.users,
      data: [],
      loading: true,
      error: null,
    },
  };
};
export const apiGetUsersSuccessReducer = (state, action) => {
  console.log("userReducer:apiGetUsersSuccessReducer", { state, action });
  return {
    ...state,
    users: {
      ...state.users,
      data: action.payload.data,
      loading: false,
      error: null,
    },
  };
};
export const apiGetUsersFailureReducer = (state, action) => {
  console.log("userReducer:apiGetUsersFailureReducer", { state, action });
  return {
    ...state,
    users: {
      ...state.users,
      loading: false,
      error: action.payload.error,
    },
  };
};
