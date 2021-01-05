import React from "react";
import { Provider } from "react-redux";
import appStore from "./appStore";
const AppStateProvider = ({ children }) => {
  console.log("### AppStateProvider:");
  return <Provider store={appStore}>{children}</Provider>;
};

export default React.memo(AppStateProvider);
