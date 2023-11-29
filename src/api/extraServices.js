import { request } from './axios';
import {
  fetchExtraServicesStart,
  fetchExtraServicesSuccess,
  fetchExtraServicesFailure,
} from '../redux/slices/extraServicesSlice';

export const fetchExtraServices = async (dispatch) => {
  dispatch(fetchExtraServicesStart());
  try {
    const res = await request.get('category/extra_service/');
    dispatch(fetchExtraServicesSuccess(res?.data?.results));
  } catch (error) {
    dispatch(fetchExtraServicesFailure(error));
  }
};
