import axios from 'axios';

const baseURL = 'https://givbox.ru/givbox/';

export const request = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-type': 'application/json',
  },
});

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;

    if (config.url === 'https://givbox.ru/givbox/api/user/login/') {
      return Promise.reject(error);
    }

    let isRefreshing = false;
    const refreshQueue = [];

    if (response.status === 401 && !isRefreshing) {
      try {
        isRefreshing = true;
        const refreshData = JSON.parse(localStorage.getItem('refreshToken'));
        const refreshResponse = await axios.post(
          'https://givbox.ru/givbox/api/token/refresh/',
          {
            refresh: refreshData,
          }
        );

        if (refreshResponse.status === 200) {
          localStorage.setItem(
            'accessToken',
            JSON.stringify(refreshResponse.data.access)
          );
          axios.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${refreshResponse.data.access}`;

          // Replay queued requests
          while (refreshQueue.length > 0) {
            const queuedRequest = refreshQueue.shift();
            try {
              const response = await axios(queuedRequest.config);
              queuedRequest.resolve(response);
            } catch (queuedError) {
              queuedRequest.reject(queuedError);
            }
          }
        } else {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/auth/sign-in';
        }
      } catch (refreshError) {
        throw new Error('Token refresh failed:', refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    if (response.status === 401 && isRefreshing) {
      return new Promise((resolve, reject) => {
        refreshQueue.push({ resolve, reject, config });
      });
    }

    return Promise.reject(error);
  }
);
