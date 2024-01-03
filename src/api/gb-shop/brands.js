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
