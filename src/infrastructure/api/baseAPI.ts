import axios, { AxiosRequestConfig } from 'axios';
const API_URL = 'https://dev-api.gist-petition.com/v1/';
const config: AxiosRequestConfig = {
  baseURL: API_URL,
  validateStatus: (status: number) => status < 500,
  timeout: 10000,
  withCredentials: true,
};

const API = axios.create(config);

// API.interceptors.response.use(
//   (response) => {
//     // console.log(response);
//     return response;
//   },
//   (error) => {
//     return error;
//   },
// );
export default API;
