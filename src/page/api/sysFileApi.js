// import { systemFileApi } from './setup';
/* eslint-disable no-unused-vars */
import axios from "axios";

const sysFileApi = {
  getImage: ({id = ''}) => axios.get(`/sys-file/${id}`, {
    baseURL: process.env.REACT_APP_API_FILE_BASE_URL
  }),
  // update: ({payload, uid}) => api.put(`/account/${uid}/`, payload),
};

export default sysFileApi;
