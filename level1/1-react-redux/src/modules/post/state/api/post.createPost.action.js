import { push } from "connected-react-router";
import { createPost } from "../../service/post.service";
import {
  API_CREATE_POST_FAILURE,
  API_CREATE_POST_START,
  API_CREATE_POST_SUCCESS,
} from "../post.actionTypes";
import { basePath } from "../../../../app/AppRoutes";

// ACTION-CREATORS:
export const apiCreatePostStartAction = () => {
  return {
    type: API_CREATE_POST_START,
  };
};

export const apiCreatePostSuccessAction = (posts) => {
  return {
    type: API_CREATE_POST_SUCCESS,
    payload: posts,
  };
};

export const apiCreatePostFailureAction = (error) => {
  return {
    type: API_CREATE_POST_FAILURE,
    payload: error,
  };
};

// ASYCN-ACTION-CREATORS:
export const apiCreatePostAction = (post) => async (dispatch) => {
  try {
    dispatch(apiCreatePostStartAction());
    const data = await createPost(post);
    dispatch(apiCreatePostSuccessAction(data));
    dispatch(push(`${basePath.post}/${data.id}`));
  } catch (e) {
    dispatch(apiCreatePostFailureAction(e.message));
  }
};
