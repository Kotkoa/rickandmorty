import { ApolloClient, InMemoryCache } from '@apollo/client';

const host = process.env.VITE_REACT_APP_GRAPHQL_API;

export const apolloClient = new ApolloClient({
  uri: host,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});
