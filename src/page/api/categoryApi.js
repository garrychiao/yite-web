// import { api } from './setup';
import axios from 'axios';
/* eslint-disable no-unused-vars */

const categoryApi = {
  list: ({params = {}}) => axios.get(`/category`, {params}),
  get: ({id = ''}) => axios.get(`/category/${id}`),
};

export default categoryApi;
