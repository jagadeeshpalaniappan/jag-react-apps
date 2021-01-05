import React from "react";
import AppNavbar from "./AppNavbar";
import AppRoutes from "../routes/AppRoutes";

const AppContainer = () => {
  console.log("### AppContainer:");
  return (
    <div>
      <AppNavbar />
      <AppRoutes />
    </div>
  );
};

export default AppContainer;
