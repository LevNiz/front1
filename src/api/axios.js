import axios from 'axios';
import { logOutFetch } from './user';
import { useDispatch } from 'react-redux';

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

// Флаг, чтобы избежать бесконечных циклов
let isRefreshing = false;

// Создаем массив запросов, ожидающих обновления токена
let subscribers = [];

// Добавим интерцептор для отправки токена с каждым запросом
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { config, response } = error;
    const originalRequest = config;

    // Проверяем статус ошибки и наличие refreshToken
    if (
      response &&
      response.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      // Если мы уже отправляем запрос на обновление токена, то подписываемся на обновление
      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribers.push((newAccessToken) => {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            resolve(axiosInstance(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const refreshResponse = await axiosInstance.post('api/token/refresh/', {
          refresh: refreshToken,
        });
        const newAccessToken = refreshResponse.data.access;
        localStorage.setItem('accessToken', newAccessToken);

        subscribers.forEach((callback) => callback(newAccessToken));
        subscribers = [];
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        const dispatch = useDispatch();

        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        await logOutFetch(dispatch);
        window.location.href = '/auth/sign-in';
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// Добавим интерцептор для обработки ответов
// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const { config, response } = error;
//     const originalRequest = config;

//     // Проверяем статус ошибки и наличие refreshToken
//     if (
//       response &&
//       response.status === 401 &&
//       originalRequest &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;

//       // Если мы уже отправляем запрос на обновление токена, то подписываемся на обновление
//       if (isRefreshing) {
//         return new Promise((resolve) => {
//           subscribers.push((newAccessToken) => {
//             originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//             resolve(axios(originalRequest));
//           });
//         });
//       }

//       isRefreshing = true;

//       try {
//         // Отправляем запрос на обновление токена
//         const refreshToken = localStorage.getItem('refreshToken');
//         const refreshResponse = await axios.post('api/token/refresh/', {
//           refresh: refreshToken,
//         });
//         const newAccessToken = refreshResponse.data.access;
//         localStorage.setItem('accessToken', newAccessToken);

//         // Вызываем подписчиков с новым токеном
//         subscribers.forEach((callback) => callback(newAccessToken));
//         subscribers = [];
//         return axios(originalRequest);
//       } catch (refreshError) {
//         localStorage.removeItem('accessToken');
//         localStorage.removeItem('refreshToken');
//         window.location.href = '/auth/sign-in';
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     return Promise.reject(error);
//   }
// );
