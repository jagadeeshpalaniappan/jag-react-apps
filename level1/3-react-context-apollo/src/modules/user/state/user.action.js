// Minimalistic Approach :: (I personally dont like this approach)
// import { apiGetUsersAction, apiCreateUserAction, apiUpdateUserAction, apiDeleteUserAction } from "./api/user.all.api.action";

// Recommended Approach (I personally like this approach)
import { SET_USER_FILTERS, SET_USER_SEARCH_KEYWORD } from "./user.actionTypes";

// LOCAL-ACTIONS:

export const setUserSearchKeywordAction = (keyword) => {
  return { type: SET_USER_SEARCH_KEYWORD, payload: keyword };
};

export const setUserFiltersAction = (payload) => {
  return { type: SET_USER_FILTERS, payload };
};
