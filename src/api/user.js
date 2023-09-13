import {
  registerStart,
  registerSuccess,
  registerFailure,
  loginStart,
  loginSuccess,
  loginFailure,
  logOut,
} from '../redux/slices/userSlice';
import { request } from './axios';
// import axios from 'axios';

// Access & Refresh token:
// axios.interceptors.request.use((config) => {
//   const access = localStorage.getItem('accessToken');
//   const authorizationToken = access ? `Bearer ${access}` : '';
//   config.headers.Authorization = authorizationToken;
//   return config;
// });

// let isRefreshing = false;
// const refreshQueue = [];

// axios.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const { config, response } = error;

//     if (config.url === 'https://givbox.ru/givbox/api/user/login/') {
//       return error;
//     }

//     if (response.status === 401 && !isRefreshing) {
//       try {
//         isRefreshing = true;
//         const refreshData = JSON.parse(localStorage.getItem('refreshToken'));
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

//           while (refreshQueue.length > 0) {
//             const queuedRequest = refreshQueue.shift();
//             queuedRequest.resolve(axios(queuedRequest.config));
//           }
//         } else {
//           localStorage.removeItem('accessToken');
//           localStorage.removeItem('refreshToken');
//           window.location.href = '/auth/sign-in';
//         }
//       } catch (refreshError) {
//         // Handle refresh error
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     if (response.status === 401 && isRefreshing) {
//       return new Promise((resolve) => {
//         refreshQueue.push({ resolve, config });
//       });
//     }

//     return Promise.reject(error);
//   }
// );

// Register:
export const registerUser = async (dispatch, data) => {
  dispatch(registerStart());
  const userData = {
    login: data.email,
    phone: data.phone,
    fullname: data.fullName,
    address: data.address,
    country: parseInt(data.country.id),
    city: parseInt(data.city.value),
    password: data.password,
    avatar:
      'https://t4.ftcdn.net/jpg/03/26/98/51/360_F_326985142_1aaKcEjMQW6ULp6oI9MYuv8lN9f8sFmj.jpg',
    wallet: [],
  };
  try {
    const res = await request.post('user/client/', userData);
    dispatch(registerSuccess(res?.data));
    localStorage.setItem('accessToken', res.data.access);
    localStorage.setItem('refreshToken', res.data.refresh);
    return { success: true };
  } catch (error) {
    dispatch(registerFailure(error));
    return { success: false };
  }
};

// Login:
export const loginUser = async (dispatch, data) => {
  dispatch(loginStart());
  const userData = {
    login: data.email,
    password: data.password,
  };
  try {
    const res = await request.post('api/user/login/', userData);
    dispatch(loginSuccess(res?.data));
    localStorage.setItem('accessToken', res.data.access);
    localStorage.setItem('refreshToken', res.data.refresh);
    return { success: true };
  } catch (error) {
    dispatch(loginFailure(error));
    return { success: false };
  }
};

// LogOut:
export const logOutFetch = async (dispatch) => {
  dispatch(logOut());
};

// Update profile:
export const UpdateProfile = async (id, data) => {
  const userData = {
    address: data?.address,
    city: data?.city?.value,
    country: data?.country?.id,
    email: data?.email,
    fullname: data?.fullName,
    phone: data?.phone,
  };
  try {
    await request.patch(`user/client/${id}/`, userData);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};
