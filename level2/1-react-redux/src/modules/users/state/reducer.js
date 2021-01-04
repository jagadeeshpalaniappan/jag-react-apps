import { handleActions } from "redux-actions";
import { v4 as uuid } from "uuid";

import {
  apiGetUsersStartAction,
  apiGetUsersSuccessAction,
  apiGetUsersFailureAction,
} from "./getUsers/actions";

import {
  apiGetUsersStartReducer,
  apiGetUsersSuccessReducer,
  apiGetUsersFailureReducer,
} from "./getUsers/reducer";

import {
  apiCreateUserStartAction,
  apiCreateUserSuccessAction,
  apiCreateUserFailureAction,
  resetCreateUserStatusAction,
} from "./createUser/actions";

import {
  apiCreateUserStartReducer,
  apiCreateUserSuccessReducer,
  apiCreateUserFailureReducer,
  resetCreateUserStatusReducer,
} from "./createUser/reducer";

import {
  apiUpdateUserStartAction,
  apiUpdateUserSuccessAction,
  apiUpdateUserFailureAction,
  resetUpdateUserStatusAction,
} from "./updateUser/actions";

import {
  apiUpdateUserStartReducer,
  apiUpdateUserSuccessReducer,
  apiUpdateUserFailureReducer,
  resetUpdateUserStatusReducer,
} from "./updateUser/reducer";

import {
  apiDeleteUserStartAction,
  apiDeleteUserSuccessAction,
  apiDeleteUserFailureAction,
  resetDeleteUserStatusAction,
} from "./deleteUser/actions";

import {
  apiDeleteUserStartReducer,
  apiDeleteUserSuccessReducer,
  apiDeleteUserFailureReducer,
  resetDeleteUserStatusReducer,
} from "./deleteUser/reducer";

import { openUserModalAction, closeUserModalAction } from "./userModal/actions";
import {
  openUserModalReducer,
  closeUserModalReducer,
} from "./userModal/reducer";

import { setVisibilityFilterAction } from "./visibilityFilter/actions";
import { setVisibilityFilterReducer } from "./visibilityFilter/reducer";

//------------------ Reducers -------------

const defaultState = {
  counter: 0,
  todos: [
    { id: uuid(), name: "Todo 1" },
    { id: uuid(), name: "Todo 2" },
  ],
  users: {
    data: [],
    loading: false,
    error: null,
  },
  user: {
    data: [],
    loading: false,
    error: null,
  },
  createUserStatus: {
    success: false,
    loading: false,
    error: null,
  },
  updateUserStatus: {
    success: false,
    loading: false,
    error: null,
  },
  deleteUserStatus: {
    success: false,
    loading: false,
    error: null,
  },
  userModal: {
    isOpen: false,
    user: null,
  },
  visibilityFilter: "All",
};

export const userReducer = handleActions(
  {
    // GET_USERS:
    [apiGetUsersStartAction]: apiGetUsersStartReducer,
    [apiGetUsersSuccessAction]: apiGetUsersSuccessReducer,
    [apiGetUsersFailureAction]: apiGetUsersFailureReducer,

    // CREATE_USER
    [apiCreateUserStartAction]: apiCreateUserStartReducer,
    [apiCreateUserSuccessAction]: apiCreateUserSuccessReducer,
    [apiCreateUserFailureAction]: apiCreateUserFailureReducer,
    [resetCreateUserStatusAction]: resetCreateUserStatusReducer,

    // UPDATE_USER
    [apiUpdateUserStartAction]: apiUpdateUserStartReducer,
    [apiUpdateUserSuccessAction]: apiUpdateUserSuccessReducer,
    [apiUpdateUserFailureAction]: apiUpdateUserFailureReducer,
    [resetUpdateUserStatusAction]: resetUpdateUserStatusReducer,

    // DELETE_USER
    [apiDeleteUserStartAction]: apiDeleteUserStartReducer,
    [apiDeleteUserSuccessAction]: apiDeleteUserSuccessReducer,
    [apiDeleteUserFailureAction]: apiDeleteUserFailureReducer,
    [resetDeleteUserStatusAction]: resetDeleteUserStatusReducer,

    // USER_MODAL
    [openUserModalAction]: openUserModalReducer,
    [closeUserModalAction]: closeUserModalReducer,

    // VISIBILITY_FILTER:
    [setVisibilityFilterAction]: setVisibilityFilterReducer,
  },
  defaultState
);
