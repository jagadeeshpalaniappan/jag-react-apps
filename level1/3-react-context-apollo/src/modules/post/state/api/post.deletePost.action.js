import { push } from "connected-react-router";
import { AppError } from "../../../common/utils/error.utils";
import { deletePost } from "../../service/post.service";
import {
  API_DELETE_POST_FAILURE,
  API_DELETE_POST_START,
  API_DELETE_POST_SUCCESS,
} from "../post.actionTypes";
import { basePath } from "../../../../app/AppRoutes";
import { apiGetPostResetAction } from "./post.getPost.action";

// ACTION-CREATORS:
export const apiDeletePostStartAction = () => {
  return {
    type: API_DELETE_POST_START,
  };
};

export const apiDeletePostSuccessAction = (post) => {
  return {
    type: API_DELETE_POST_SUCCESS,
  };
};

export const apiDeletePostFailureAction = (error) => {
  return {
    type: API_DELETE_POST_FAILURE,
    payload: error,
  };
};

// ASYCN-ACTION-CREATORS:
export const apiDeletePostAction = (post) => async (dispatch) => {
  try {
    dispatch(apiDeletePostStartAction());
    const data = await deletePost(post);
    if (data) {
      // SUCCESS
      dispatch(apiDeletePostSuccessAction(data));
      dispatch(apiGetPostResetAction());
      dispatch(push(basePath.post));
    } else {
      // FAILURE
      throw new AppError("Failed to Delete");
    }
  } catch (e) {
    // FAILURE
    dispatch(apiDeletePostFailureAction(e.message));
  }
};
