import axios from 'axios';
import { headers } from '~/utils/headers';

const ROOT_URL = 'http://localhost:3000/api/v1';

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
