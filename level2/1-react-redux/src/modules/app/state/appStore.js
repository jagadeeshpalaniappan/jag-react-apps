import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

import { userReducer } from "../../../modules/users1/state/reducer";
import { postReducer } from "../../../modules/post/state/reducer";

//--------------------------------- Redux: Reducer -----------------------------------

const createRootReducer = () => {
  return combineReducers({
    userState: userReducer,
    postState: postReducer,
  });
};

//--------------------------------- Redux: Store -----------------------------------
const rootReducer = createRootReducer();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [logger, thunk];
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
