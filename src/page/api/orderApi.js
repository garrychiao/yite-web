// import { api } from './setup';
import axios from 'axios';
/* eslint-disable no-unused-vars */

const orderApi = {
  list: () => axios.get(`/order`),
  create: ({payload}) => axios.post(`/order`, payload),
};

export default orderApi;
