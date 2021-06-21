import axios from 'axios';
import { BASE_URL } from './config';

const instance = {
  baseURL: BASE_URL,
  timeout: 5000,
};

const axiosInstance = axios.create(instance);

axiosInstance.interceptors.response.use(
  (response) => response,
  // console.log(error.response.data);
  // @TODO: Hanle expire token here
  (error) => Promise.reject(error),
);

export const axiosAuth = (accessToken: string) => {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

  return axiosInstance;
};

export default axiosInstance;
