import {
  registerStart,
  registerSuccess,
  registerFailure,
  loginStart,
  loginSuccess,
  loginFailure,
  logOutSuccess,
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
    country: parseInt(data.country),
    city: parseInt(data.city),
    password: data.password,
    wallet: null,
  };
  try {
    const res = await request.post('user/client/', userData);
    console.log(res?.data?.data);
    dispatch(registerSuccess(res?.data?.data));
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
    return { success: true };
  } catch (error) {
    dispatch(loginFailure(error));
    return { success: false };
  }
};

// LogOut:
export const logOut = async (dispatch) => {
  dispatch(logOutSuccess());
};
