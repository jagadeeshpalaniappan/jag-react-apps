import React from "react";

import { BrowserRouter } from "react-router-dom";
const AppRouteProvider = ({ children }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

//import { ConnectedRouter } from 'connected-react-router';
// import { history } from '../store/app.store';
// const AppRouteProvider = ({ children }) => {
//   console.log('### AppRouteProvider:');
//   return <ConnectedRouter history={history}>{children}</ConnectedRouter>;
// };

export default AppRouteProvider;
