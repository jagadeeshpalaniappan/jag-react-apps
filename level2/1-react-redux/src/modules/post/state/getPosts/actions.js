//------------------ Actions -------------
import { createActions } from "redux-actions";
import { getPosts } from "./api";

// ACTION-CREATORS:
export const {
  // GET_POSTS:
  apiGetPostsStartAction,
  apiGetPostsSuccessAction,
  apiGetPostsFailureAction,
} = createActions(
  // GET_POSTS:
  "API_GET_POSTS_START_ACTION",
  "API_GET_POSTS_SUCCESS_ACTION",
  "API_GET_POSTS_FAILURE_ACTION"
);

// ASYCN-ACTION-CREATORS:
export const apiGetPostsAction = (config) => async (dispatch) => {
  try {
    console.log("apiGetPostsAction", config);
    dispatch(apiGetPostsStartAction(config));
    const response = await getPosts(config);
    dispatch(apiGetPostsSuccessAction(response));
  } catch (e) {
    console.log("apiGetPostsAction:err", e);
    dispatch(apiGetPostsFailureAction({ error: e.message }));
  }
};
