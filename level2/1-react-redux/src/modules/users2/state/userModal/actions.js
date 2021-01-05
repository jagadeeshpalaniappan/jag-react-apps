import { createActions } from "redux-actions";
import { resetCreateUserStatusAction } from "../createUser/actions";
import { resetUpdateUserStatusAction } from "../updateUser/actions";

// ACTION-CREATORS:
export const { openUserModalAction, closeUserModalAction } = createActions(
  "OPEN_USER_MODAL_ACTION",
  "CLOSE_USER_MODAL_ACTION"
);

export const closeUserModalAndResetStatusAction = () => (dispatch) => {
  console.log("closeUserModalAndResetStatusAction");
  dispatch(closeUserModalAction());
  dispatch(resetCreateUserStatusAction());
  dispatch(resetUpdateUserStatusAction());
};
