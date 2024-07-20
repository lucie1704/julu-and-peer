import axios from 'axios';
import { API_URL } from '~/constants';
import { headers } from '~/utils/headers';

const ROOT_URL = API_URL;

const axiosInstance = axios.create({
  baseURL: ROOT_URL,
  timeout: 1000,
  headers: headers()
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
