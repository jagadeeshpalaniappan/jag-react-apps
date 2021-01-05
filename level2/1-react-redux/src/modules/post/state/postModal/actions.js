import { createActions } from "redux-actions";
import { resetCreatePostStatusAction } from "../createPost/actions";
import { resetUpdatePostStatusAction } from "../updatePost/actions";

// ACTION-CREATORS:
export const { openPostModalAction, closePostModalAction } = createActions(
  "OPEN_POST_MODAL_ACTION",
  "CLOSE_POST_MODAL_ACTION"
);

export const closePostModalAndResetStatusAction = () => (dispatch) => {
  console.log("closePostModalAndResetStatusAction");
  dispatch(closePostModalAction());
  dispatch(resetCreatePostStatusAction());
  dispatch(resetUpdatePostStatusAction());
};
