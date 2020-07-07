import { SET_USER_FILTERS, SET_USER_SEARCH_KEYWORD } from "./user.actionTypes";

// REDUCER:
export const initialUserState = {
  searchKeyword: "",
  filters: null,
};

export const userReducer = (userState = initialUserState, action) => {
  console.log("userReducer", { action });

  switch (action.type) {
    case SET_USER_SEARCH_KEYWORD:
      return {
        ...userState,
        searchKeyword: action.payload,
      };
    case SET_USER_FILTERS:
      return {
        ...userState,
        filters: action.payload,
      };
    default:
      return userState;
  }
};
