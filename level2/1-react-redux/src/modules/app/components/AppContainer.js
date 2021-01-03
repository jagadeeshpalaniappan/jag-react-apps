import React from "react";
// import { useRoutes } from "react-router-dom";
// import routes from 'src/modules/app/routes';
import AppNavbar from "./AppNavbar";
import AppRoutes from "./AppRoutes";

const AppContainer = () => {
  console.log("### AppContainer:");
  // const routing = useRoutes(routes);
  // return routing;
  return (
    <div>
      <AppNavbar />
      <AppRoutes />
    </div>
  );
};

export default AppContainer;
