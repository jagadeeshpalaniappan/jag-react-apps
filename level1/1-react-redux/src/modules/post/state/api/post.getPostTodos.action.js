import { getTodosByPostId } from "../../service/post.service";
import {
  API_GET_USER_TODOS_FAILURE,
  API_GET_USER_TODOS_START,
  API_GET_USER_TODOS_SUCCESS,
} from "../post.actionTypes";

// ACTION-CREATORS:
export const apiGetPostTodosStartAction = () => {
  return {
    type: API_GET_USER_TODOS_START,
  };
};

export const apiGetPostTodosSuccessAction = (post) => {
  return {
    type: API_GET_USER_TODOS_SUCCESS,
    payload: post,
  };
};

export const apiGetPostTodosFailureAction = (error) => {
  return {
    type: API_GET_USER_TODOS_FAILURE,
    payload: error,
  };
};

// ASYCN-ACTION-CREATORS:
export const apiGetPostTodosAction = (post) => async (dispatch) => {
  try {
    dispatch(apiGetPostTodosStartAction());
    const data = await getTodosByPostId(post);
    dispatch(apiGetPostTodosSuccessAction(data));
  } catch (e) {
    console.log("apiGetPostTodosAction:: err", e);
    dispatch(apiGetPostTodosFailureAction(e.message));
  }
};
