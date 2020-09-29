import axios from "axios";
import { Person } from "actions";
import { User } from "actions/auth/types";
import { getClient } from "utils/auth.client";
import { LOGIN, LoginInput, RefreshTokenInput, REFRESH_TOKEN } from "graphqls/graphql";

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
    const payload: LoginInput = { username: user.username, password: user.password }
    return getClient()
      .mutate({
        mutation: LOGIN,
        variables: { input: payload }
      })
  },

  refreshToken(token: string) {
    const payload: RefreshTokenInput = { token: token }
    return getClient()
      .mutate({
        mutation: REFRESH_TOKEN,
        variables: { input: payload }
      })
  }

}
