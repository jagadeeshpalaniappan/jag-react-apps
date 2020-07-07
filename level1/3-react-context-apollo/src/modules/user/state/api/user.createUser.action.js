import { push } from "connected-react-router";
import { createUser } from "../../service/user.service";
import {
  API_CREATE_USER_FAILURE,
  API_CREATE_USER_START,
  API_CREATE_USER_SUCCESS,
} from "../user.actionTypes";
import { basePath } from "../../../../app/AppRoutes";

// ACTION-CREATORS:
export const apiCreateUserStartAction = () => {
  return {
    type: API_CREATE_USER_START,
  };
};

export const apiCreateUserSuccessAction = (users) => {
  return {
    type: API_CREATE_USER_SUCCESS,
    payload: users,
  };
};

export const apiCreateUserFailureAction = (error) => {
  return {
    type: API_CREATE_USER_FAILURE,
    payload: error,
  };
};

// ASYCN-ACTION-CREATORS:
export const apiCreateUserAction = (user) => async (dispatch) => {
  try {
    dispatch(apiCreateUserStartAction());
    const data = await createUser(user);
    dispatch(apiCreateUserSuccessAction(data));
    dispatch(push(`${basePath.user}/${data.id}`));
  } catch (e) {
    dispatch(apiCreateUserFailureAction(e.message));
  }
};
