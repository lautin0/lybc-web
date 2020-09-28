import axios from "axios";
import { Person } from "actions";
import { User } from "actions/auth/types";
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import UNIVERSALS from "Universals";

const client = new ApolloClient({
  uri: UNIVERSALS.GRAPHQL_ENDPOINT,
  cache: new InMemoryCache()
});

const getConfig = () => {
  let token = localStorage.getItem("token")
  return {
    headers: {
      Authorization: token && ('Bearer ' + token)
    }
  }
}

export const api = {
  saveNewComer(person: Person) {
    return axios.post('/new-comer/', person, getConfig());
  },

  fetchNewComers(pageSize: number, page: number) {
    return axios.get(`/new-comer/${pageSize}/${page}`);
  },

  signIn(user: User) {
    // return axios.post('/auth/', user);
    return client
      .mutate({
        mutation: gql`
          mutation jwt {
            login(input: {username: "${user.username}", password: "${user.password}"})
          }
        `
      })
  }
}
