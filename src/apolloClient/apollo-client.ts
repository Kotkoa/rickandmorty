// import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
// import { setContext } from '@apollo/client/link/context';

// const host = process.env.VITE_REACT_APP_GRAPHQL_API;
// console.log('host', host);

// const token = '';

// const authLink = setContext((_, { headers }) => {
//   return { headers: { ...headers, authorization: token ? `Bearer ${token}` : '' } };
// });

// const httpLink = createHttpLink({ uri: host });

// export const apolloClient = new ApolloClient({
//   link: authLink.concat(httpLink),
//   // uri: process.env.REACT_APP_GRAPHQL_API,
//   cache: new InMemoryCache(),
//   connectToDevTools: true,
// });
