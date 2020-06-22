import { getPostsByPostId } from "../../service/post.service";
import {
  API_GET_USER_POSTS_FAILURE,
  API_GET_USER_POSTS_START,
  API_GET_USER_POSTS_SUCCESS,
} from "../post.actionTypes";

// ACTION-CREATORS:
export const apiGetPostPostsStartAction = () => {
  return {
    type: API_GET_USER_POSTS_START,
  };
};

export const apiGetPostPostsSuccessAction = (post) => {
  return {
    type: API_GET_USER_POSTS_SUCCESS,
    payload: post,
  };
};

export const apiGetPostPostsFailureAction = (error) => {
  return {
    type: API_GET_USER_POSTS_FAILURE,
    payload: error,
  };
};

// ASYCN-ACTION-CREATORS:
export const apiGetPostPostsAction = (post) => async (dispatch) => {
  try {
    dispatch(apiGetPostPostsStartAction());
    const data = await getPostsByPostId(post);
    dispatch(apiGetPostPostsSuccessAction(data));
  } catch (e) {
    console.log("apiGetPostPostsAction:: err", e);
    dispatch(apiGetPostPostsFailureAction(e.message));
  }
};
