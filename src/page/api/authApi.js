// import { api } from './setup';
import axios from 'axios';
/* eslint-disable no-unused-vars */

const authApi = {
  getMe: ({token = false}) => axios.get(`/user/me`, {
    baseURL: `${process.env.REACT_APP_API_BASE_URL}/api`,
    headers: token ? {
      'Authorization': token,
    } : {}
  }),
};

export default authApi;
