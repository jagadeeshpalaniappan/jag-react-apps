import React from "react";
import AppContainer from "./AppContainer";
import AppNav from "./AppNavbar";
import AppRouteProvider from "./AppRouteProvider";
import AppRoutes from "./AppRoutes";
import AppStateProvider from "./AppStateProvider";

const App = () => {
  console.log("### App:");
  return (
    <AppStateProvider>
      <AppRouteProvider>
        <AppContainer
          nav={<AppNav title="React App1" secondaryTitle="(Hooks & Redux)" />}
          main={<AppRoutes />}
        />
      </AppRouteProvider>
    </AppStateProvider>
  );
};

export default React.memo(App);
