import { getPostsByUserId } from "../../service/user.service";
import {
  API_GET_USER_POSTS_FAILURE,
  API_GET_USER_POSTS_START,
  API_GET_USER_POSTS_SUCCESS,
} from "../user.actionTypes";

// ACTION-CREATORS:
export const apiGetUserPostsStartAction = () => {
  return {
    type: API_GET_USER_POSTS_START,
  };
};

export const apiGetUserPostsSuccessAction = (user) => {
  return {
    type: API_GET_USER_POSTS_SUCCESS,
    payload: user,
  };
};

export const apiGetUserPostsFailureAction = (error) => {
  return {
    type: API_GET_USER_POSTS_FAILURE,
    payload: error,
  };
};

// ASYCN-ACTION-CREATORS:
export const apiGetUserPostsAction = (user) => async (dispatch) => {
  try {
    dispatch(apiGetUserPostsStartAction());
    const data = await getPostsByUserId(user);
    dispatch(apiGetUserPostsSuccessAction(data));
  } catch (e) {
    console.log("apiGetUserPostsAction:: err", e);
    dispatch(apiGetUserPostsFailureAction(e.message));
  }
};
