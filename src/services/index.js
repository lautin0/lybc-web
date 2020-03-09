import axios from "axios";

export const api = {
  saveNewComer(person){    
    return axios.post('/new-comer/', person);
  },

  fetchNewComers(pageSize, page){    
    return axios.get(`/new-comer/${pageSize}/${page}`);
  }
}
