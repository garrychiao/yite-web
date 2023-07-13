// import { api } from './setup';
import axios from 'axios';
/* eslint-disable no-unused-vars */

const cartApi = {
  list: () => axios.get(`/cart`),
  add: ({payload}) => axios.post(`/cart`, payload),
  update: ({payload}) => axios.put(`/cart`, payload),
  delete: ({id}) => axios.delete(`/cart/${id}`),
};

export default cartApi;
