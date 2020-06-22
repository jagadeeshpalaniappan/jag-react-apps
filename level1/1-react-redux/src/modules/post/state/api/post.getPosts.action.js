import {
  API_GET_USERS_START,
  API_GET_USERS_SUCCESS,
  API_GET_USERS_FAILURE,
} from "../post.actionTypes";

import { getPosts } from "../../service/post.service";
// import { getPosts } from "../../service/post.service.json";

// ACTION-CREATORS:
export const apiGetPostsStartAction = (config) => {
  return {
    type: API_GET_USERS_START,
    payload: { config },
  };
};

export const apiGetPostsSuccessAction = (config, posts) => {
  return {
    type: API_GET_USERS_SUCCESS,
    payload: { config, posts },
  };
};

export const apiGetPostsFailureAction = (config, error) => {
  return {
    type: API_GET_USERS_FAILURE,
    payload: { config, error },
  };
};

// ASYCN-ACTION-CREATORS:
export const apiGetPostsAction = (config) => async (dispatch) => {
  try {
    dispatch(apiGetPostsStartAction(config));
    const response = await getPosts(config);
    dispatch(apiGetPostsSuccessAction(config, response));
  } catch (e) {
    dispatch(apiGetPostsFailureAction(config, e.message));
  }
};
