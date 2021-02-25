import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import UNIVERSALS from "Universals";
import { isTokenExpired } from "./utils";
import { createUploadLink } from 'apollo-upload-client'

// const httpLink = createHttpLink({
//   uri: UNIVERSALS.GRAPHQL_ENDPOINT,
// });

const uploadLink = createUploadLink({
  uri: UNIVERSALS.GRAPHQL_ENDPOINT,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token")

  const refreshToken = localStorage.getItem("refreshToken")

  // return the headers to the context so httpLink can read them
  if (token && !isTokenExpired(token)) {
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : "",
      }
    }
  } else {
    return {
      headers: {
        ...headers,
        Authorization: refreshToken ? `Bearer ${refreshToken}` : "",
      }
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(uploadLink),
  cache: new InMemoryCache({
    typePolicies: {
      Post: {
        fields: {
          user: {
            // Short for options.mergeObjects(existing, incoming).
            merge: true,
          },
        },
      },
    },
  })
});

export function getClient() {
  return client
}

export function resetClient() {
  client.clearStore();
}