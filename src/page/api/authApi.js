// import { api } from './setup';
import axios from 'axios';
/* eslint-disable no-unused-vars */

const authApi = {
  getMe: ({token}) => axios.get(`/user/me`, {
    baseURL: `${process.env.REACT_APP_API_BASE_URL}/api`,
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  }),
};

export default authApi;
