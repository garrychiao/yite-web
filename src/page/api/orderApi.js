// import { api } from './setup';
import axios from 'axios';
/* eslint-disable no-unused-vars */

const orderApi = {
  list: (limit = 0) => axios.get(`/order`, {
    params: {
      limit
    }
  }),
  create: ({payload}) => axios.post(`/order`, payload),
  get: (id = '', token) => axios.get(`/order/${id}`, token ? {
    baseURL: `${process.env.REACT_APP_API_BASE_URL}/api`,
    headers: {
      Authorization: token
    }
  } : {}),
  initPayment: (payload, token) => axios.post('/payment/init', payload, {
    baseURL: `${process.env.REACT_APP_API_BASE_URL}/api`,
    headers: {
      Authorization: token
    }
  }),
};

export default orderApi;
