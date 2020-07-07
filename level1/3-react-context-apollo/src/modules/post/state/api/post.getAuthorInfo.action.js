// import { getUser } from "../../../user/service/user.service";

import {
  API_GET_POST_AUTHOR_INFO_START,
  API_GET_POST_AUTHOR_INFO_SUCCESS,
  API_GET_POST_AUTHOR_INFO_FAILURE,
  API_GET_POST_AUTHOR_INFO_RESET,
} from "../post.actionTypes";

// ACTION-CREATORS:
export const apiGetAuthorInfoStartAction = () => {
  return {
    type: API_GET_POST_AUTHOR_INFO_START,
  };
};

export const apiGetAuthorInfoSuccessAction = (post) => {
  return {
    type: API_GET_POST_AUTHOR_INFO_SUCCESS,
    payload: post,
  };
};

export const apiGetAuthorInfoFailureAction = (error) => {
  return {
    type: API_GET_POST_AUTHOR_INFO_FAILURE,
    payload: error,
  };
};

export const apiGetAuthorInfoResetAction = (error) => {
  return {
    type: API_GET_POST_AUTHOR_INFO_RESET,
    payload: error,
  };
};

// ASYCN-ACTION-CREATORS:
// export const apiGetAuthorInfoAction = (config) => async (dispatch) => {
//   try {
//     dispatch(apiGetAuthorInfoStartAction());
//     const data = await getUser(config);
//     dispatch(apiGetAuthorInfoSuccessAction(data));
//   } catch (e) {
//     console.log("apiGetAuthorInfoAction:: err", e);
//     dispatch(apiGetAuthorInfoFailureAction(e.message));
//   }
// };
