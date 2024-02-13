import { request } from '../axios';
import {
  fetchStoreStart,
  fetchStoreSuccess,
  fetchStoreFailure,
} from '../../redux/slices/storeSlice';

export const fetchBrands = async (dispatch) => {
  dispatch(fetchStoreStart());
  try {
    const res = await request.get('user/store/');
    dispatch(fetchStoreSuccess(res?.data));
  } catch (error) {
    dispatch(fetchStoreFailure(error));
  }
};

export const fetchFilteredBrands = async (categoryID) => {
  try {
    const res = await request.get(`category/category/${categoryID}/`);
    return { success: true, data: res?.data?.store };
  } catch (error) {
    return { success: false };
  }
};
