import { createActions } from "redux-actions";
import { updateUser } from "./api";
import { apiGetUsersAction } from "../getUsers/actions";

// ACTION-CREATORS:
export const {
  apiUpdateUserStartAction,
  apiUpdateUserSuccessAction,
  apiUpdateUserFailureAction,
  resetUpdateUserStatusAction,
} = createActions(
  "API_UPDATE_USER_START_ACTION",
  "API_UPDATE_USER_SUCCESS_ACTION",
  "API_UPDATE_USER_FAILURE_ACTION",
  "RESET_UPDATE_USER_STATUS_ACTION"
);

// ASYCN-ACTION-CREATORS:
export const apiUpdateUserAction = (user) => async (dispatch) => {
  try {
    console.log("apiUpdateUserAction", user);
    dispatch(apiUpdateUserStartAction(user));
    const response = await updateUser(user);
    dispatch(apiUpdateUserSuccessAction(response));
    // refresh:
    dispatch(apiGetUsersAction());
  } catch (e) {
    console.log("apiGetUsersAction:err", e);
    dispatch(apiUpdateUserFailureAction({ error: e.message }));
  }
};
