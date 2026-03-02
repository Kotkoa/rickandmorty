import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const host = import.meta.env.VITE_REACT_APP_GRAPHQL_API || 'https://rickandmortyapi.com/graphql';

export const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: host }),
  cache: new InMemoryCache(),
  devtools: { enabled: import.meta.env.DEV },
  dataMasking: false,
});
