import {
  fetchCostsFailure,
  fetchCostsStart,
  fetchCostsSuccess,
} from '../redux/slices/costsSlice';
import { request } from './axios';

// Costs:
export const fetchCosts = async (dispatch) => {
  dispatch(fetchCostsStart());
  try {
    const res = await request.get('category/costs/');
    dispatch(fetchCostsSuccess(res?.data));
  } catch (error) {
    dispatch(fetchCostsFailure(error));
  }
};
