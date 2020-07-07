import React from "react";
import { BrowserRouter } from "react-router-dom";

const AppRouteProvider = ({ children }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};
export default React.memo(AppRouteProvider);
