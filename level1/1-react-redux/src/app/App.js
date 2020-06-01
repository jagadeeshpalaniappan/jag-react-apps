import React, { Component } from "react";
import AppStateProvider from "./AppStateProvider";
import AppRouteProvider from "./AppRouteProvider";
import AppRoutes from "./AppRoutes";
import AppContainer from "./AppContainer";
import AppNav from "./AppNavbar";

export default class App extends Component {
  render() {
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
  }
}
