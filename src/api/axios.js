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
    'Content-type': 'application/json',
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
          const refreshResponse = await axiosInstance.post('api/token/refresh/', {
            refreshToken: refreshToken,
          });

          const newAccessToken = refreshResponse?.data?.access;
          localStorage.setItem('accessToken', JSON.stringify(newAccessToken));
          const originalRequest = error.config;
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return request(originalRequest);
        } catch (refreshError) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/auth/sign-in';
          return Promise.reject(refreshError);
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

// request.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const { config, response } = error;

//     if (config.url === 'https://givbox.ru/givbox/api/user/login/') {
//       return Promise.reject(error);
//     }

//     let isRefreshing = false;
//     const refreshQueue = [];

//     if (response.status === 401 && !isRefreshing) {
//       try {
//         isRefreshing = true;
//         const refreshData = localStorage.getItem('refreshToken');
//         const refreshResponse = await axios.post(
//           'https://givbox.ru/givbox/api/token/refresh/',
//           {
//             refresh: refreshData,
//           }
//         );

//         if (refreshResponse.status === 200) {
//           localStorage.setItem(
//             'accessToken',
//             JSON.stringify(refreshResponse.data.access)
//           );
//           axios.defaults.headers.common[
//             'Authorization'
//           ] = `Bearer ${refreshResponse.data.access}`;

//           // Replay queued requests
//           while (refreshQueue.length > 0) {
//             const queuedRequest = refreshQueue.shift();
//             try {
//               const response = await axios(queuedRequest.config);
//               queuedRequest.resolve(response);
//             } catch (queuedError) {
//               queuedRequest.reject(queuedError);
//             }
//           }
//         } else {
//           localStorage.removeItem('accessToken');
//           localStorage.removeItem('refreshToken');
//           window.location.href = '/auth/sign-in';
//         }
//       } catch (refreshError) {
//         throw new Error('Token refresh failed:', refreshError);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     if (response.status === 401 && isRefreshing) {
//       return new Promise((resolve, reject) => {
//         refreshQueue.push({ resolve, reject, config });
//       });
//     }

//     return Promise.reject(error);
//   }
// );
