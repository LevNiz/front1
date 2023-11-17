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
// export const axiosInstance = axios.create({
//   baseURL: baseURL,
//   headers: {
//     'Content-type': 'multipart/form-data',
//   },
// });

// axiosInstance.interceptors.request.use((config) => {
//   const access = localStorage.getItem('accessToken');
//   const authorizationToken = access ? `Bearer ${access}` : '';
//   config.headers.Authorization = authorizationToken;
//   return config;
// });

// let isRefreshing = false;
// const requestQueue = [];

// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     if (error.response && error.response.status === 401) {
//       if (!isRefreshing) {
//         isRefreshing = true;

//         const refreshToken = localStorage.getItem('refreshToken');
//         if (!refreshToken) {
//           return Promise.reject(error);
//         }

//         try {
//           const refreshResponse = await axiosInstance.post(
//             'api/token/refresh/',
//             {
//               refresh: refreshToken,
//             }
//           );

//           const newAccessToken = refreshResponse?.data?.access;
//           localStorage.setItem('accessToken', JSON.stringify(newAccessToken));
//           const originalRequest = error.config;
//           originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//           return request(originalRequest);
//         } catch (error) {
//           localStorage.removeItem('accessToken');
//           localStorage.removeItem('refreshToken');
//           window.location.href = '/auth/sign-in';
//           return Promise.reject(error);
//         } finally {
//           isRefreshing = false;
//           requestQueue.forEach((requestCallback) => requestCallback());
//           requestQueue.length = 0;
//         }
//       } else {
//         return new Promise((resolve) => {
//           requestQueue.push(() => {
//             resolve(request(error.config));
//           });
//         });
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-type': 'multipart/form-data',
  },
});

// Добавьте интерцептор для отправки токена с каждым запросом
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

// Добавьте интерцептор для обработки ответов
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Проверка наличия токена обновления
    const refreshToken = localStorage.getItem('refreshToken');
    if (
      refreshToken &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      // Попытка обновления токена через запрос refresh
      try {
        const response = await axiosInstance.post('api/token/refresh/', {
          refresh: refreshToken,
        });

        // Если запрос refresh успешен, обновите accessToken и отправьте оригинальный запрос снова
        const newAccessToken = response.data.access;
        localStorage.setItem('accessToken', newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        // Если запрос refresh не удался, перенаправьте пользователя на страницу входа
        // Возможно, вам также нужно очистить localStorage от токенов
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        // Ваш код для перенаправления на страницу входа
      }
    }

    return Promise.reject(error);
  }
);
