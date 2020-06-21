import { getUserTodos } from "../../service/user.service";
import {
  API_GET_USER_TODOS_FAILURE,
  API_GET_USER_TODOS_START,
  API_GET_USER_TODOS_SUCCESS,
} from "../user.actionTypes";

// ACTION-CREATORS:
export const apiGetUserTodosStartAction = () => {
  return {
    type: API_GET_USER_TODOS_START,
  };
};

export const apiGetUserTodosSuccessAction = (user) => {
  return {
    type: API_GET_USER_TODOS_SUCCESS,
    payload: user,
  };
};

export const apiGetUserTodosFailureAction = (error) => {
  return {
    type: API_GET_USER_TODOS_FAILURE,
    payload: error,
  };
};

// ASYCN-ACTION-CREATORS:
export const apiGetUserTodosAction = (user) => async (dispatch) => {
  try {
    dispatch(apiGetUserTodosStartAction());
    const data = await getUserTodos(user);
    dispatch(apiGetUserTodosSuccessAction(data));
  } catch (e) {
    console.log("apiGetUserTodosAction:: err", e);
    dispatch(apiGetUserTodosFailureAction(e.message));
  }
};
