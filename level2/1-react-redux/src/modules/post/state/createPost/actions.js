import { createActions } from "redux-actions";
import { createPost } from "./api";
import { apiGetPostsAction } from "../getPosts/actions";

// ACTION-CREATORS:
export const {
  apiCreatePostStartAction,
  apiCreatePostSuccessAction,
  apiCreatePostFailureAction,
  resetCreatePostStatusAction,
} = createActions(
  "API_CREATE_POST_START_ACTION",
  "API_CREATE_POST_SUCCESS_ACTION",
  "API_CREATE_POST_FAILURE_ACTION",
  "RESET_CREATE_POST_STATUS_ACTION"
);

// ASYCN-ACTION-CREATORS:
export const apiCreatePostAction = (post) => async (dispatch) => {
  try {
    console.log("apiCreatePostAction", post);
    dispatch(apiCreatePostStartAction(post));
    const response = await createPost(post);
    dispatch(apiCreatePostSuccessAction(response));
    // refresh:
    dispatch(apiGetPostsAction());
  } catch (e) {
    console.log("apiGetPostsAction:err", e);
    dispatch(apiCreatePostFailureAction({ error: e.message }));
  }
};
