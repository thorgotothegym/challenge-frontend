import axios from "axios";
import { getDataFromLocalStorage } from '../utils/get';

export const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/'
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  const getToken = getDataFromLocalStorage();
  config.headers.authorization = `Bearer ${getToken.access_token}`
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});
