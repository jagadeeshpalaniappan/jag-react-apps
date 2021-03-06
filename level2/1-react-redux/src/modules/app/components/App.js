import React from "react";

import AppStateProvider from "../state/AppStateProvider";
import AppRouteProvider from "../routes/AppRouteProvider";
import AppContainer from "./AppContainer";

const App = () => {
  console.log("### App:");
  return (
    <AppStateProvider>
      <AppRouteProvider>
        <AppContainer />
      </AppRouteProvider>
    </AppStateProvider>
  );
};

export default React.memo(App);
