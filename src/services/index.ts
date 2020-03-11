import axios from "axios";
import { Person } from "actions";

export const api = {
  saveNewComer(person: Person){    
    return axios.post('/new-comer/', person);
  },

  fetchNewComers(pageSize: number, page: number){    
    return axios.get(`/new-comer/${pageSize}/${page}`);
  }
}
