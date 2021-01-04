// REDUCERS:

export const setVisibilityFilterReducer = (state, action) => {
  console.log("userReducer:setVisibilityFilterReducer", { state, action });
  return {
    ...state,
    visibilityFilter: action.payload,
  };
};
