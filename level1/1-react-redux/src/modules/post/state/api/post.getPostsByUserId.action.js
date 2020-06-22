import { getPostsByUserId } from "../../service/post.service";
import {
  API_GET_POSTS_BY_USER_FAILURE,
  API_GET_POSTS_BY_USER_START,
  API_GET_POSTS_BY_USER_SUCCESS,
} from "../post.actionTypes";

// ACTION-CREATORS:
export const apiGetPostsByUserIdStartAction = () => {
  return {
    type: API_GET_POSTS_BY_USER_START,
  };
};

export const apiGetPostsByUserIdSuccessAction = (post) => {
  return {
    type: API_GET_POSTS_BY_USER_SUCCESS,
    payload: post,
  };
};

export const apiGetPostsByUserIdFailureAction = (error) => {
  return {
    type: API_GET_POSTS_BY_USER_FAILURE,
    payload: error,
  };
};

// ASYCN-ACTION-CREATORS:
export const apiGetPostsByUserIdAction = (post) => async (dispatch) => {
  try {
    dispatch(apiGetPostsByUserIdStartAction());
    const data = await getPostsByUserId(post);
    dispatch(apiGetPostsByUserIdSuccessAction(data));
  } catch (e) {
    console.log("apiGetPostsByUserIdAction:: err", e);
    dispatch(apiGetPostsByUserIdFailureAction(e.message));
  }
};
