import { createActions } from "redux-actions";
import { deleteUser } from "./api";

// ACTION-CREATORS:
export const {
  apiDeleteUserStartAction,
  apiDeleteUserSuccessAction,
  apiDeleteUserFailureAction,
  resetDeleteUserStatusAction,
} = createActions(
  "API_DELETE_USER_START_ACTION",
  "API_DELETE_USER_SUCCESS_ACTION",
  "API_DELETE_USER_FAILURE_ACTION",
  "RESET_DELETE_USER_STATUS_ACTION"
);

// ASYCN-ACTION-CREATORS:
export const apiDeleteUserAction = (user) => async (dispatch) => {
  try {
    console.log("apiDeleteUserAction", user);
    dispatch(apiDeleteUserStartAction(user));
    const response = await deleteUser(user);
    dispatch(apiDeleteUserSuccessAction(response));
  } catch (e) {
    console.log("apiGetUsersAction:err", e);
    dispatch(apiDeleteUserFailureAction({ error: e.message }));
  }
};
