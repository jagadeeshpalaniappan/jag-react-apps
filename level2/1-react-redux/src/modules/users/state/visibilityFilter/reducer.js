// REDUCERS:

export const setVisibilityFilterReducer = (state, action) => {
  console.log("userReducer:setVisibilityFilterReducer", { state, action });
  let visibilityFilter = state.visibilityFilter;
  const { active, search } = action.payload;
  if (active) visibilityFilter = { ...visibilityFilter, active };
  if (search) visibilityFilter = { ...visibilityFilter, search };
  return { ...state, visibilityFilter };
};
