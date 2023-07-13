import axios from 'axios';
import log from 'loglevel';
import { notification } from 'antd';
import { toJson } from 'shared/json';
import _ from 'lodash';

export default function setupAxios() {
  // set request base url
  const token = localStorage.getItem('_auth');
  // console.log(`token`)
  // console.log(token)

  const publicBaseURL = `${process.env.REACT_APP_API_BASE_URL}/public`;
  const authBaseURL = `${process.env.REACT_APP_API_BASE_URL}/api`;
  
  if (token) {
    axios.defaults.baseURL = authBaseURL;
  } else {
    axios.defaults.baseURL = publicBaseURL;
  }
  
  // request interceptor
  axios.interceptors.request.use(async (request) => {
    log.debug(
      'axios:request',
      request.method,
      request.url,
      request.data || request.params
    );
    
    try {
      if (token) {
        request.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      log.error('axios:getIdToken.error', e);
    }
    return request;
  });
  // response interceptor
  axios.interceptors.response.use(
    (response) => {
      return Promise.resolve(response.data);
    },
    (error) => {
      log.error('axios:response.error', { error });
      const info = error.response?.data?.info ?? {};
      if (!_.isObject(info.msg)) {
        notification.error({
          message: info.code || error.message,
          description: info.msg || defaultHttpErrorMessage(error),
        });
      }
      return Promise.reject(error.response?.data);
    }
  );
}

function defaultHttpErrorMessage(error) {
  return error.response ? toJson(error.response.data) : '';
}
