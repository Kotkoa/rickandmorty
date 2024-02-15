import { ApolloClient, InMemoryCache } from '@apollo/client';

const host = import.meta.env.VITE_REACT_APP_GRAPHQL_API;

export const apolloClient = new ApolloClient({
  uri: host,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});
