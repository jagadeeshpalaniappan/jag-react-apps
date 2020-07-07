import React, { createContext, useContext, useReducer } from "react";
import { combineReducers } from "../modules/common/utils/store.utils";
import {
  initialPostState,
  postReducer,
} from "../modules/post/state/post.reducer";
import {
  initialUserState,
  userReducer,
} from "../modules/user/state/user.reducer";

export const AppContext = createContext();
export const useAppState = () => useContext(AppContext);

// // data:
// const BOOKS = [{ id: "101", name: "Book 1" }];

// export const Actions = { ADD_BOOK: "ADD_BOOK", DELETE_BOOK: "DELETE_BOOK" };
// export const UserActions = {
//   SET_USER_FILTERS: "SET_USER_FILTERS",
// };

// const appStateReducer = (state, action) => {
//   console.log("AppContext: appStateReducer, action:", action);
//   switch (action.type) {
//     case UserActions.SET_USER_FILTERS: {
//       return {
//         ...state,
//         filters: [...action.item],
//       };
//     }
//     case Actions.ADD_BOOK: {
//       const nextBookId = state.nextBookId + 1;
//       return {
//         ...state,
//         nextBookId,
//         books: [...state.books, { ...action.item, id: nextBookId }],
//       };
//     }
//     case Actions.DELETE_BOOK: {
//       console.log("AppState:: DELETE_BOOK: action:", action, !!action.item);
//       return {
//         ...state,
//         books: state.books.filter((book) => book.id !== action.item.id),
//       };
//     }
//     default: {
//       console.log("AppContext: appStateReducer, state:", state);
//       return state;
//     }
//   }
// };

// const initialState = {
//   books: BOOKS,
//   nextBookId: BOOKS.length + 100,
//   filters: null,
// };

// const initialAppStat = {
//   name: "Harry",
//   city: "London",
// };

// const initialUserState = {
//   filters: null,
// };
// const initialPostState = {
//   filters: null,
// };
// const appReducer = (state, action) => {
//   switch (action.type) {
//     case "ACTION_ONE":
//       return { ...state, name: "Puli" };
//     default:
//       return state;
//   }
// };
// const userReducer = (state, action) => {
//   switch (action.type) {
//     case UserActions.SET_USER_FILTERS: {
//       return {
//         ...state,
//         filters: [...action.payload],
//       };
//     }
//     default:
//       return state;
//   }
// };

// function isPromise(v) {
//   return v && typeof v.then === "function";
// }

// const promiseMiddleware = (store) => (next) => (action) => {
//   if (isPromise(action.payload)) {
//     store.dispatch({ type: "ASYNC_START", subtype: action.type });

//     const currentView = store.getState().viewChangeCounter;
//     const skipTracking = action.skipTracking;

//     action.payload.then(
//       (res) => {
//         const currentState = store.getState();
//         if (!skipTracking && currentState.viewChangeCounter !== currentView) {
//           return;
//         }
//         console.log("RESULT", res);
//         action.payload = res;
//         store.dispatch({ type: "ASYNC_END", promise: action.payload });
//         store.dispatch(action);
//       },
//       (error) => {
//         const currentState = store.getState();
//         if (!skipTracking && currentState.viewChangeCounter !== currentView) {
//           return;
//         }
//         console.log("ERROR", error);
//         action.error = true;
//         action.payload = error.response.body;
//         if (!action.skipTracking) {
//           store.dispatch({ type: "ASYNC_END", promise: action.payload });
//         }
//         store.dispatch(action);
//       }
//     );

//     return;
//   }

//   next(action);
// };

// export const applyMiddleware = (dispatch) => async (action) => {
//   promiseMiddleware(dispatch(action));
// };

const [rootReducerCombined, initialStateCombined] = combineReducers({
  // appState: [appReducer, initialAppStat],
  userState: [userReducer, initialUserState],
  postState: [postReducer, initialPostState],
});

export function AppStateProvider({ children }) {
  //   const [appState, dispatch] = useReducer(appStateReducer, initialState);
  const [appState, dispatch] = useReducer(
    rootReducerCombined,
    initialStateCombined
  );
  return (
    <AppContext.Provider value={[appState, dispatch]}>
      {children}
    </AppContext.Provider>
  );
}

export function connectAppContext(mapStateToProps, mapDispatchToProps) {
  return (Component) => {
    return (props) => (
      <AppContext.Consumer>
        {(value) => {
          console.log("connectAppContext:", value);
          const [state, dispatch] = value;

          const stateToProps = mapStateToProps ? mapStateToProps(state) : null;

          const dispatchToProps = mapDispatchToProps
            ? mapDispatchToProps(dispatch)
            : null;

          return (
            <Component {...props} {...stateToProps} {...dispatchToProps} />
          );
        }}
      </AppContext.Consumer>
    );
  };
}
