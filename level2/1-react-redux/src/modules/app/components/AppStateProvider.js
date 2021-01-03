import React from "react";
import { Provider } from "react-redux";
import store from "../store/app.store";
const AppStateProvider = ({ children }) => {
  console.log("### AppStateProvider:");
  return <Provider store={store}>{children}</Provider>;
};

export default React.memo(AppStateProvider);
