import {
  API_GET_POST_START,
  API_GET_POST_SUCCESS,
  API_GET_POST_FAILURE,
  API_GET_POST_RESET,
} from "../post.actionTypes";

import { getPost } from "../../service/post.service";
import { apiGetAuthorInfoResetAction } from "./post.getAuthorInfo.action";

// ACTION-CREATORS:
export const apiGetPostStartAction = () => {
  return {
    type: API_GET_POST_START,
  };
};

export const apiGetPostSuccessAction = (post) => {
  return {
    type: API_GET_POST_SUCCESS,
    payload: post,
  };
};

export const apiGetPostResetAction = (error) => {
  return {
    type: API_GET_POST_RESET,
    payload: error,
  };
};

export const apiGetPostFailureAction = (error) => {
  return {
    type: API_GET_POST_FAILURE,
    payload: error,
  };
};

// ASYCN-ACTION-CREATORS:
export const apiGetPostAction = (post) => async (dispatch) => {
  try {
    dispatch(apiGetAuthorInfoResetAction()); // RESER_AUTHOR_INFO
    dispatch(apiGetPostStartAction());
    const data = await getPost(post);
    dispatch(apiGetPostSuccessAction(data));
  } catch (e) {
    console.log("apiGetPostAction:: err", e);
    dispatch(apiGetPostFailureAction(e.message));
  }
};
