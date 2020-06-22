import { push } from "connected-react-router";
import {
  API_UPDATE_USER_START,
  API_UPDATE_USER_SUCCESS,
  API_UPDATE_USER_FAILURE,
} from "../user.actionTypes";
import { updateUser } from "../../service/user.service";
import { basePath } from "../../../../app/AppRoutes";

// ACTION-CREATORS:
export const apiUpdateUserStartAction = () => {
  return {
    type: API_UPDATE_USER_START,
  };
};

export const apiUpdateUserSuccessAction = (users) => {
  return {
    type: API_UPDATE_USER_SUCCESS,
    payload: users,
  };
};

export const apiUpdateUserFailureAction = (error) => {
  return {
    type: API_UPDATE_USER_FAILURE,
    payload: error,
  };
};

// ASYCN-ACTION-CREATORS:
export const apiUpdateUserAction = (user) => async (dispatch) => {
  try {
    dispatch(apiUpdateUserStartAction());
    const data = await updateUser(user);
    dispatch(push(`${basePath.user}/${data.id}`));
    setTimeout(() => dispatch(apiUpdateUserSuccessAction(data)), 500);
  } catch (e) {
    dispatch(apiUpdateUserFailureAction(e.message));
  }
};
