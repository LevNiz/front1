import { request } from './axios';
import {
  fetchBuyerFailure,
  fetchBuyerStart,
  fetchBuyerSuccess,
} from '../redux/slices/buyerSlice';

// Fetch buyers:
export const fetchBuyers = async (dispatch) => {
  dispatch(fetchBuyerStart());
  try {
    const res = await request.get('user/buyer/');
    dispatch(fetchBuyerSuccess(res?.data?.results));
  } catch (error) {
    dispatch(fetchBuyerFailure(error));
  }
};

// Search depot:
export const searchBuyer = async (buyerName, dispatch) => {
  dispatch(fetchBuyerStart());
  try {
    const res = await request.get(`user/buyer/?search=${buyerName}`);
    dispatch(fetchBuyerSuccess(res?.data?.results));
  } catch (error) {
    dispatch(fetchBuyerFailure(error));
  }
};
