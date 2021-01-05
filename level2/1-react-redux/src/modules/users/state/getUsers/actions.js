//------------------ Actions -------------
import { createActions } from "redux-actions";
import { getUsers } from "./api";

// ACTION-CREATORS:
export const {
  // GET_USERS:
  apiGetUsersStartAction,
  apiGetUsersSuccessAction,
  apiGetUsersFailureAction,
} = createActions(
  // GET_USERS:
  "API_GET_USERS_START_ACTION",
  "API_GET_USERS_SUCCESS_ACTION",
  "API_GET_USERS_FAILURE_ACTION"
);

// ASYCN-ACTION-CREATORS:
export const apiGetUsersAction = (config) => async (dispatch) => {
  try {
    console.log("apiGetUsersAction", config);
    dispatch(apiGetUsersStartAction(config));
    const response = await getUsers(config);
    dispatch(apiGetUsersSuccessAction(response));
  } catch (e) {
    console.log("apiGetUsersAction:err", e);
    dispatch(apiGetUsersFailureAction({ error: e.message }));
  }
};
