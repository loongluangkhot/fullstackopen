import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  from,
  split,
} from "@apollo/client";
import { WebSocketLink } from '@apollo/client/link/ws';
import { setContext } from "@apollo/client/link/context";
import { getMainDefinition } from '@apollo/client/utilities';
import { API, LOCAL_STORAGE_KEY } from "./constants";

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEY);
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    },
  };
});
const httpLink = new HttpLink({ uri: API });
const authHttpLink = from([authLink, httpLink]);
const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/subscriptions',
  options: {
    reconnect: true
  }
});
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authHttpLink,
);

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  link: splitLink,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
