import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
export const client = new ApolloClient({
  // uri: "https://graphqlzero.almansi.me/api",
  uri: "/demo/graphql/v1/api",
});

export function AppApolloProvider({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
