import axios from 'axios';

const baseURL = 'https://givbox.ru/givbox/';

// Use only token not required requests:

export const request = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-type': 'application/json',
    
  },
});

// Use only token required requests:
export const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-type': 'multipart/form-data',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const access = localStorage.getItem('accessToken');
  const authorizationToken = access ? `Bearer ${access}` : '';
  config.headers.Authorization = authorizationToken;
  return config;
});

let isRefreshing = false;
const requestQueue = [];

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;

        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          return Promise.reject(error);
        }

        try {
          const refreshResponse = await axiosInstance.post(
            'api/token/refresh/',
            {
              refresh: refreshToken,
            }
          );

          const newAccessToken = refreshResponse?.data?.access;
          localStorage.setItem('accessToken', JSON.stringify(newAccessToken));
          const originalRequest = error.config;
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return request(originalRequest);
        } catch (error) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/auth/sign-in';
          return Promise.reject(error);
        } finally {
          isRefreshing = false;
          requestQueue.forEach((requestCallback) => requestCallback());
          requestQueue.length = 0;
        }
      } else {
        return new Promise((resolve) => {
          requestQueue.push(() => {
            resolve(request(error.config));
          });
        });
      }
    }

    return Promise.reject(error);
  }
);
