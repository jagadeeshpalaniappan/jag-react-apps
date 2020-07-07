import React from "react";
import AppContainer from "./AppContainer";
import AppNav from "./AppNavbar";
import AppRouteProvider from "./AppRouteProvider";
import AppRoutes from "./AppRoutes";
import AppStateProviderRx from "./AppStateProvider";
import { AppStateProvider } from "../store/AppContext";
import { AppApolloProvider } from "../store/apollo";

const App = () => {
  console.log("### App:");
  return (
    <AppStateProvider>
      <AppStateProviderRx>
        <AppApolloProvider>
          <AppRouteProvider>
            <AppContainer
              nav={
                <AppNav title="React App1" secondaryTitle="(Hooks & Redux)" />
              }
              main={<AppRoutes />}
            />
          </AppRouteProvider>
        </AppApolloProvider>
      </AppStateProviderRx>
    </AppStateProvider>
  );
};

export default React.memo(App);
