import { push } from "connected-react-router";
import { AppError } from "../../../common/utils/error.utils";
import { deletePost } from "../../service/post.service";
import {
  API_DELETE_USER_FAILURE,
  API_DELETE_USER_START,
  API_DELETE_USER_SUCCESS,
} from "../post.actionTypes";
import { basePath } from "../../../../app/AppRoutes";

// ACTION-CREATORS:
export const apiDeletePostStartAction = () => {
  return {
    type: API_DELETE_USER_START,
  };
};

export const apiDeletePostSuccessAction = (post) => {
  return {
    type: API_DELETE_USER_SUCCESS,
  };
};

export const apiDeletePostFailureAction = (error) => {
  return {
    type: API_DELETE_USER_FAILURE,
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
