// import { api } from './setup';
/* eslint-disable no-unused-vars */
import axios from 'axios';

const productApi = {
  list: ({params = {}}) => axios.get(`/product`, {params}),
  get: ({id = ''}) => axios.get(`/product/${id}`),
  getFeatures: ({id = ''}) => axios.get(`/product/${id}/features`),
  getImages: ({id = ''}) => axios.get(`/product/${id}/images`),
  getFiles: ({id = ''}) => axios.get(`/product/${id}/files`),
  getInventory: ({productId, modelNo}) => axios.get(`/product/inventory`, {
    params: {
      productId, 
      modelNo,
    }
  }),
  getHotCategory: () => axios.get(`/product/hot/category`, {
    params: {
      enable: true,
    }
  }),
  getHotProducts: ({categoryId}) => axios.get(`/product/hot/product`, {
    params: {
      hotCategoryId: categoryId,
    }
  }),
};

export default productApi;
