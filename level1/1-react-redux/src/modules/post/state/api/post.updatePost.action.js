import { push } from "connected-react-router";
import {
  API_UPDATE_POST_START,
  API_UPDATE_POST_SUCCESS,
  API_UPDATE_POST_FAILURE,
} from "../post.actionTypes";
import { updatePost } from "../../service/post.service";
import { basePath } from "../../../../app/AppRoutes";

// ACTION-CREATORS:
export const apiUpdatePostStartAction = () => {
  return {
    type: API_UPDATE_POST_START,
  };
};

export const apiUpdatePostSuccessAction = (posts) => {
  return {
    type: API_UPDATE_POST_SUCCESS,
    payload: posts,
  };
};

export const apiUpdatePostFailureAction = (error) => {
  return {
    type: API_UPDATE_POST_FAILURE,
    payload: error,
  };
};

// ASYCN-ACTION-CREATORS:
export const apiUpdatePostAction = (post) => async (dispatch) => {
  try {
    dispatch(apiUpdatePostStartAction());
    const data = await updatePost(post);
    dispatch(push(`${basePath.post}/${data.id}`));
    setTimeout(() => dispatch(apiUpdatePostSuccessAction(data)), 500);
  } catch (e) {
    dispatch(apiUpdatePostFailureAction(e.message));
  }
};
