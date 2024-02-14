import { ApolloClient, InMemoryCache } from '@apollo/client';

const host = process.env.VITE_REACT_APP_GRAPHQL_API;

console.log(host);

export const apolloClient = new ApolloClient({
  uri: host,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});
