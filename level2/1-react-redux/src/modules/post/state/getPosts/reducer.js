// REDUCERS:
export const apiGetPostsStartReducer = (state, action) => {
  console.log("postReducer:apiGetPostsStartReducer", { state, action });
  return {
    ...state,
    posts: {
      ...state.posts,
      loading: true,
      error: null,
    },
  };
};
export const apiGetPostsSuccessReducer = (state, action) => {
  console.log("postReducer:apiGetPostsSuccessReducer", { state, action });

  const posts = action.payload.data;
  const postMap = posts.reduce((res, post) => {
    res[post.id] = post;
    return res;
  }, {});
  const postIds = Object.keys(postMap);

  return {
    ...state,
    postMap,
    posts: {
      ...state.posts,
      data: postIds,
      loading: false,
      error: null,
    },
  };
};
export const apiGetPostsFailureReducer = (state, action) => {
  console.log("postReducer:apiGetPostsFailureReducer", { state, action });
  return {
    ...state,
    posts: {
      ...state.posts,
      loading: false,
      error: action.payload.error,
    },
  };
};
