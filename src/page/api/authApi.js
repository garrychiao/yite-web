// import { api } from './setup';
import axios from 'axios';
/* eslint-disable no-unused-vars */

const authApi = {
  getMe: () => axios.get(`/user/me`),
};

export default authApi;
