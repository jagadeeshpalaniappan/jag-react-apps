// REDUCERS:

export const setFilterReducer = (state, action) => {
  console.log("userReducer:setFilterReducer", { state, action });
  let filter = state.filter;
  const { active, search } = action.payload;
  if (active) filter = { ...filter, active };
  if (search || search === "") filter = { ...filter, search };
  return { ...state, filter };
};
