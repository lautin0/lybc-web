import axios from "axios";
import { Person } from "actions";
import { User } from "actions/auth/types";

export const api = {
  saveNewComer(person: Person){    
    return axios.post('/new-comer/', person);
  },

  fetchNewComers(pageSize: number, page: number){    
    return axios.get(`/new-comer/${pageSize}/${page}`);
  },

  signIn(user: User){
    return axios.post('/auth/', user);
  }
}
