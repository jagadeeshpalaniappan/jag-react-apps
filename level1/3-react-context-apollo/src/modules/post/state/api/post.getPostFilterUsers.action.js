import {
  API_GET_POST_FILTER_USERS_START,
  API_GET_POST_FILTER_USERS_SUCCESS,
  API_GET_POST_FILTER_USERS_FAILURE,
} from "../post.actionTypes";

import { getUsers } from "../../../user/service/user.service";

// ACTION-CREATORS:
export const apiGetPostFilterUsersStartAction = (config) => {
  return {
    type: API_GET_POST_FILTER_USERS_START,
    payload: { config },
  };
};

export const apiGetPostFilterUsersSuccessAction = (config, users) => {
  return {
    type: API_GET_POST_FILTER_USERS_SUCCESS,
    payload: { config, users },
  };
};

export const apiGetPostFilterUsersFailureAction = (config, error) => {
  return {
    type: API_GET_POST_FILTER_USERS_FAILURE,
    payload: { config, error },
  };
};

// ASYCN-ACTION-CREATORS:
// export const apiGetPostFilterUsersAction = (config) => async (dispatch) => {
//   try {
//     dispatch(apiGetPostFilterUsersStartAction(config));
//     const response = await getUsers(config);
//     dispatch(apiGetPostFilterUsersSuccessAction(config, response));
//   } catch (e) {
//     dispatch(apiGetPostFilterUsersFailureAction(config, e.message));
//   }
// };
