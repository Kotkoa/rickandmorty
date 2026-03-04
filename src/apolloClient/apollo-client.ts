import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { CombinedGraphQLErrors } from '@apollo/client/errors';
import { ErrorLink } from '@apollo/client/link/error';

const host = import.meta.env.VITE_REACT_APP_GRAPHQL_API || 'https://rickandmortyapi.com/graphql';

const errorLink = new ErrorLink(({ error }) => {
  if (CombinedGraphQLErrors.is(error)) {
    error.errors.forEach(({ message, locations, path }) =>
      console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
    );
  } else {
    console.error(`[Network error]: ${error.message}`);
  }
});

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, new HttpLink({ uri: host })]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          characters: {
            keyArgs: ['page', 'filter'],
          },
          charactersByIds: {
            keyArgs: ['ids'],
          },
        },
      },
    },
  }),
  devtools: { enabled: import.meta.env.DEV },
  dataMasking: false,
});
