import React from "react";
import { ToastContainer } from "react-toastify";
import AppContainer from "./AppContainer";
import AppNav from "./AppNavbar";
import AppRouteProvider from "./AppRouteProvider";
import AppRoutes from "./AppRoutes";
import { AppStateProvider } from "../store/AppContext";
import { AppApolloProvider } from "../store/apollo";

const App = () => {
  console.log("### App:");
  return (
    <AppStateProvider>
      <AppApolloProvider>
        <AppRouteProvider>
          <AppContainer
            nav={
              <AppNav
                title="React App3"
                secondaryTitle="(Hooks, Context API, ApolloClient)"
              />
            }
            main={<AppRoutes />}
          />
          <ToastContainer />
        </AppRouteProvider>
      </AppApolloProvider>
    </AppStateProvider>
  );
};

export default React.memo(App);
