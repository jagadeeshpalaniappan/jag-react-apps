import { createActions } from "redux-actions";
import { deletePost } from "./api";
import { apiGetPostsAction } from "../getPosts/actions";

// ACTION-CREATORS:
export const {
  apiDeletePostStartAction,
  apiDeletePostSuccessAction,
  apiDeletePostFailureAction,
  resetDeletePostStatusAction,
} = createActions(
  "API_DELETE_POST_START_ACTION",
  "API_DELETE_POST_SUCCESS_ACTION",
  "API_DELETE_POST_FAILURE_ACTION",
  "RESET_DELETE_POST_STATUS_ACTION"
);

// ASYCN-ACTION-CREATORS:
export const apiDeletePostAction = (post) => async (dispatch) => {
  try {
    console.log("apiDeletePostAction", post);
    dispatch(apiDeletePostStartAction(post));
    const response = await deletePost(post);
    dispatch(apiDeletePostSuccessAction(response));
    // refresh:
    dispatch(apiGetPostsAction());
  } catch (e) {
    console.log("apiGetPostsAction:err", e);
    dispatch(apiDeletePostFailureAction({ error: e.message }));
  }
};
