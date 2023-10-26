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

// Filter depots:
export const filterBuyer = async (filterData, dispatch) => {
  const { country, websites } = filterData;
  const countryID = country?.value || '';
  const websiteID = websites?.value || '';
  dispatch(fetchBuyerStart());
  try {
    const res = await request.get(
      `user/buyer/?${countryID && `countries=${countryID}`}${
        websiteID && `&websites=${websiteID}`
      }`
    );
    dispatch(fetchBuyerSuccess(res?.data?.results));
  } catch (error) {
    dispatch(fetchBuyerFailure(error));
  }
};
