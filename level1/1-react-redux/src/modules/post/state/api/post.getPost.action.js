import {
  API_GET_USER_START,
  API_GET_USER_SUCCESS,
  API_GET_USER_FAILURE,
} from "../post.actionTypes";

import { getPost } from "../../service/post.service";

// ACTION-CREATORS:
export const apiGetPostStartAction = () => {
  return {
    type: API_GET_USER_START,
  };
};

export const apiGetPostSuccessAction = (post) => {
  return {
    type: API_GET_USER_SUCCESS,
    payload: post,
  };
};

export const apiGetPostFailureAction = (error) => {
  return {
    type: API_GET_USER_FAILURE,
    payload: error,
  };
};

// ASYCN-ACTION-CREATORS:
export const apiGetPostAction = (post) => async (dispatch) => {
  try {
    dispatch(apiGetPostStartAction());
    const data = await getPost(post);
    dispatch(apiGetPostSuccessAction(data));
  } catch (e) {
    console.log("apiGetPostAction:: err", e);
    dispatch(apiGetPostFailureAction(e.message));
  }
};
