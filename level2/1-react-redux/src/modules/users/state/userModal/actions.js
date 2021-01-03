import { createActions } from "redux-actions";

// ACTION-CREATORS:
export const { openUserModalAction, closeUserModalAction } = createActions(
  "OPEN_USER_MODAL_ACTION",
  "CLOSE_USER_MODAL_ACTION"
);
