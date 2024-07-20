import axios from 'axios';
import { headers } from '~/utils/headers';

const ROOT_URL = process.env.VUE_APP_API_URL;

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
