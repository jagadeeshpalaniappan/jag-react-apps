import { handleActions } from "redux-actions";
import { v4 as uuid } from "uuid";

import {
  apiGetPostsStartAction,
  apiGetPostsSuccessAction,
  apiGetPostsFailureAction,
} from "./getPosts/actions";

import {
  apiGetPostsStartReducer,
  apiGetPostsSuccessReducer,
  apiGetPostsFailureReducer,
} from "./getPosts/reducer";

import {
  apiCreatePostStartAction,
  apiCreatePostSuccessAction,
  apiCreatePostFailureAction,
  resetCreatePostStatusAction,
} from "./createPost/actions";

import {
  apiCreatePostStartReducer,
  apiCreatePostSuccessReducer,
  apiCreatePostFailureReducer,
  resetCreatePostStatusReducer,
} from "./createPost/reducer";

import {
  apiUpdatePostStartAction,
  apiUpdatePostSuccessAction,
  apiUpdatePostFailureAction,
  resetUpdatePostStatusAction,
} from "./updatePost/actions";

import {
  apiUpdatePostStartReducer,
  apiUpdatePostSuccessReducer,
  apiUpdatePostFailureReducer,
  resetUpdatePostStatusReducer,
} from "./updatePost/reducer";

import {
  apiDeletePostStartAction,
  apiDeletePostSuccessAction,
  apiDeletePostFailureAction,
  resetDeletePostStatusAction,
} from "./deletePost/actions";

import {
  apiDeletePostStartReducer,
  apiDeletePostSuccessReducer,
  apiDeletePostFailureReducer,
  resetDeletePostStatusReducer,
} from "./deletePost/reducer";

import { openPostModalAction, closePostModalAction } from "./postModal/actions";
import {
  openPostModalReducer,
  closePostModalReducer,
} from "./postModal/reducer";

import { setFilterAction } from "./filter/actions";
import { setFilterReducer } from "./filter/reducer";

//------------------ Reducers -------------

const defaultState = {
  counter: 0,
  todos: [
    { id: uuid(), name: "Todo 1" },
    { id: uuid(), name: "Todo 2" },
  ],
  postMap: {},
  posts: {
    data: [],
    loading: false,
    error: null,
  },
  post: {
    data: [],
    loading: false,
    error: null,
  },
  createPostStatus: {
    success: false,
    loading: false,
    error: null,
  },
  updatePostStatus: {
    success: false,
    loading: false,
    error: null,
  },
  deletePostStatus: {
    success: false,
    loading: false,
    error: null,
  },
  postModal: {
    isOpen: false,
    post: null,
  },
  filter: {
    active: "All",
    search: "",
  },
};

export const postReducer = handleActions(
  {
    // GET_POSTS:
    [apiGetPostsStartAction]: apiGetPostsStartReducer,
    [apiGetPostsSuccessAction]: apiGetPostsSuccessReducer,
    [apiGetPostsFailureAction]: apiGetPostsFailureReducer,

    // CREATE_POST
    [apiCreatePostStartAction]: apiCreatePostStartReducer,
    [apiCreatePostSuccessAction]: apiCreatePostSuccessReducer,
    [apiCreatePostFailureAction]: apiCreatePostFailureReducer,
    [resetCreatePostStatusAction]: resetCreatePostStatusReducer,

    // UPDATE_POST
    [apiUpdatePostStartAction]: apiUpdatePostStartReducer,
    [apiUpdatePostSuccessAction]: apiUpdatePostSuccessReducer,
    [apiUpdatePostFailureAction]: apiUpdatePostFailureReducer,
    [resetUpdatePostStatusAction]: resetUpdatePostStatusReducer,

    // DELETE_POST
    [apiDeletePostStartAction]: apiDeletePostStartReducer,
    [apiDeletePostSuccessAction]: apiDeletePostSuccessReducer,
    [apiDeletePostFailureAction]: apiDeletePostFailureReducer,
    [resetDeletePostStatusAction]: resetDeletePostStatusReducer,

    // POST_MODAL
    [openPostModalAction]: openPostModalReducer,
    [closePostModalAction]: closePostModalReducer,

    // FILTER:
    [setFilterAction]: setFilterReducer,
  },
  defaultState
);
