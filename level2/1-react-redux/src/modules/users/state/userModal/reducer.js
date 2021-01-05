// REDUCERS:

export const openUserModalReducer = (state, action) => {
  console.log("userReducer:openUserModalReducer", { state, action });
  return {
    ...state,
    userModal: {
      ...state.userModal,
      isOpen: true,
      user: action.payload,
    },
  };
};

export const closeUserModalReducer = (state, action) => {
  console.log("userReducer:closeUserModalReducer", { state, action });
  return {
    ...state,
    userModal: {
      ...state.userModal,
      isOpen: false,
      user: null,
    },
  };
};
