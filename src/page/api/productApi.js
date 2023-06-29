// import { api } from './setup';
/* eslint-disable no-unused-vars */
import axios from 'axios';

const productApi = {
  list: ({params = {}}) => axios.get(`/product`, {params}),
  get: ({id = ''}) => axios.get(`/product/${id}`),
  getFeatures: ({id = ''}) => axios.get(`/product/${id}/features`),
  getImages: ({id = ''}) => axios.get(`/product/${id}/images`),
  getFiles: ({id = ''}) => axios.get(`/product/${id}/files`),
};

export default productApi;
