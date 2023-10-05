import { request } from './axios';
import {
  fetchCountriesStart,
  fetchCountriesSuccess,
  fetchCountriesFailure,
} from '../redux/slices/countrySlice';

export const fetchCountries = async (dispatch) => {
  dispatch(fetchCountriesStart());
  try {
    const res = await request.get('category/country/');
    dispatch(fetchCountriesSuccess(res?.data));
    return { success: true, data: res.data };
  } catch (error) {
    dispatch(fetchCountriesFailure(error));
  }
};
