import {
  registerStart,
  registerSuccess,
  registerFailure,
  loginStart,
  loginSuccess,
  loginFailure,
  logOut,
} from '../redux/slices/userSlice';
import { axiosInstance, request } from './axios';
import jwt_decode from 'jwt-decode';

// Register:
export const registerUser = async (dispatch, data) => {
  dispatch(registerStart());
  const userData = {
    login: data.email,
    phone: data.phone,
    fullname: data.fullName,
    address: data.address,
    country: parseInt(data.country.value),
    city: parseInt(data.city.value),
    password: data.password,
    user_type: 'client',
    avatar: null,
    wallet: [],
  };
  try {
    const res = await request.post('user/client/', userData);
    const userID = jwt_decode(res?.data.access);
    dispatch(registerSuccess({ user: res?.data, userID: userID?.user_id }));
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
  const userData = {
    login: data.email,
    password: data.password,
  };
  try {
    dispatch(loginStart());
    const res = await request.post('api/user/login/', userData);
    const client = jwt_decode(res?.data.access);
    if (client?.user_type === 'client') {
      dispatch(loginSuccess({ user: res?.data, userID: client?.user_id }));
      localStorage.setItem('accessToken', res.data.access);
      localStorage.setItem('refreshToken', res.data.refresh);
      return { success: true };
    }
    dispatch(loginFailure());
    return { success: false };
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
export const UpdateProfile = async ({ userID, data, ava }) => {
  const milliseconds = new Date().getMilliseconds();
  const formData = new FormData();
  const userData = {
    address: data?.address,
    city: data?.city?.value,
    country: data?.country?.value,
    email: data?.email,
    fullname: data?.fullName,
    phone: data?.phone,
  };

  if (ava) {
    formData.append('image', ava);
    formData.append('title', milliseconds);
    try {
      const res = await axiosInstance.post('core/image/', formData);
      userData.avatar = res?.data?.image;
    } catch (imageError) {
      return { success: false };
    }
  }

  try {
    await request.patch(`user/client/${userID}/`, userData);
    return { success: true };
  } catch (patchError) {
    return { success: false };
  }
};
