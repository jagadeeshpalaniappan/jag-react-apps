// REDUCERS:

export const openPostModalReducer = (state, action) => {
  console.log("postReducer:openPostModalReducer", { state, action });
  return {
    ...state,
    postModal: {
      ...state.postModal,
      isOpen: true,
      post: action.payload,
    },
  };
};

export const closePostModalReducer = (state, action) => {
  console.log("postReducer:closePostModalReducer", { state, action });
  return {
    ...state,
    postModal: {
      ...state.postModal,
      isOpen: false,
      post: null,
    },
  };
};
