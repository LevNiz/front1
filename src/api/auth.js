import {
  registerStart,
  registerSuccess,
  registerFailure,
} from '../redux/slices/userSlice';
import { request } from './axios';

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
