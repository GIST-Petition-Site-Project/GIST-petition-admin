import axios, { AxiosRequestConfig } from 'axios';
const API_URL =
  process.env.NODE_ENV !== 'production' ? 'https://api.gist-petition.com/v1/' : 'https://dev-api.gist-petition.com/v1/';
const config: AxiosRequestConfig = {
  baseURL: API_URL,
  validateStatus: (status: number) => status < 500,
  timeout: 10000,
  withCredentials: true,
};

const API = axios.create(config);

export default API;
