import { request } from './axios';
import {
  fetchCitiesStart,
  fetchCitiesSuccess,
  fetchCitiesFailure,
} from '../redux/slices/citySlice';

export const fetchCities = async (dispatch) => {
  dispatch(fetchCitiesStart());
  try {
    const res = await request.get('category/city/');
    dispatch(fetchCitiesSuccess(res?.data));
  } catch (error) {
    dispatch(fetchCitiesFailure(error));
  }
};
