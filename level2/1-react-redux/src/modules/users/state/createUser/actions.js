import { createActions } from "redux-actions";
import { createUser } from "./api";

// ACTION-CREATORS:
export const {
  apiCreateUserStartAction,
  apiCreateUserSuccessAction,
  apiCreateUserFailureAction,
  resetCreateUserStatusAction,
} = createActions(
  "API_CREATE_USER_START_ACTION",
  "API_CREATE_USER_SUCCESS_ACTION",
  "API_CREATE_USER_FAILURE_ACTION",
  "RESET_CREATE_USER_STATUS_ACTION"
);

// ASYCN-ACTION-CREATORS:
export const apiCreateUserAction = (user) => async (dispatch) => {
  try {
    console.log("apiCreateUserAction", user);
    dispatch(apiCreateUserStartAction(user));
    const response = await createUser(user);
    dispatch(apiCreateUserSuccessAction(response));
  } catch (e) {
    console.log("apiGetUsersAction:err", e);
    dispatch(apiCreateUserFailureAction({ error: e.message }));
  }
};
