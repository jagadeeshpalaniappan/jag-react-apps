import { createActions } from "redux-actions";
import { updatePost } from "./api";
import { apiGetPostsAction } from "../getPosts/actions";

// ACTION-CREATORS:
export const {
  apiUpdatePostStartAction,
  apiUpdatePostSuccessAction,
  apiUpdatePostFailureAction,
  resetUpdatePostStatusAction,
} = createActions(
  "API_UPDATE_POST_START_ACTION",
  "API_UPDATE_POST_SUCCESS_ACTION",
  "API_UPDATE_POST_FAILURE_ACTION",
  "RESET_UPDATE_POST_STATUS_ACTION"
);

// ASYCN-ACTION-CREATORS:
export const apiUpdatePostAction = (post) => async (dispatch) => {
  try {
    console.log("apiUpdatePostAction", post);
    dispatch(apiUpdatePostStartAction(post));
    const response = await updatePost(post);
    dispatch(apiUpdatePostSuccessAction(response));
    // refresh:
    // dispatch(apiGetPostsAction());
  } catch (e) {
    console.log("apiGetPostsAction:err", e);
    dispatch(apiUpdatePostFailureAction({ error: e.message }));
  }
};
