import axios from 'axios';

export const baseURL = 'https://givbox.ru/givbox/';

// Use only for get requests:
export const request = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-type': 'application/json',
  },
});

// Use only for patch, post, delete requests
export const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  const authorizationToken = accessToken ? `Bearer ${accessToken}` : '';
  config.headers.Authorization = authorizationToken;
  return config;
});
