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
