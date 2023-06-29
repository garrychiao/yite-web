import axios from 'axios';
import log from 'loglevel';
import { notification } from 'antd';
import { toJson } from 'shared/json';
import _ from 'lodash';

export default function setupAxios() {
  // set request base url
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
  // axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
  // request interceptor
  axios.interceptors.request.use(async (request) => {
    log.debug(
      'axios:request',
      request.method,
      request.url,
      request.data || request.params
    );
    
    try {
      // // https://firebase.google.com/docs/reference/js/auth.md?authuser=0#getidtoken
      // // Returns the current token if it has not expired or if it will not
      // // expire in the next five minutes. Otherwise, this will refresh the
      // // token and return a new one.
      // if (auth?.currentUser) {
      //   const token = await getIdToken(auth.currentUser);
      //   request.headers.authorization = `JWT ${token}`;
      // }
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
