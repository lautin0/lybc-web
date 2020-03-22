import axios from "axios";
import { Person } from "actions";
import { User } from "actions/auth/types";

const getConfig = () => {
  let token = sessionStorage.getItem("jwt")
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
    return axios.post('/auth/', user);
  }
}
