import {
  fetchDepotsFailure,
  fetchDepotsStart,
  fetchDepotsSuccess,
} from '../redux/slices/depotSlice';
import { request } from './axios';

// Fetch all Depots:
export const fetchDepots = async (dispatch) => {
  dispatch(fetchDepotsStart());
  try {
    const res = await request.get('core/depot/');
    dispatch(fetchDepotsSuccess(res?.data?.results));
  } catch (error) {
    dispatch(fetchDepotsFailure(error));
  }
};

// Fetch Depots detail:
export const fetchDepotsDetail = async (id) => {
  try {
    const res = await request.get(`core/depot/${id}/`);
    return { success: true, data: res?.data };
  } catch (error) {
    return { success: false, data: error };
  }
};

// Search depot:
export const searchDepot = async (depotName, dispatch) => {
  dispatch(fetchDepotsStart());
  try {
    const res = await request.get(`core/depot/?search=${depotName}`);
    dispatch(fetchDepotsSuccess(res?.data?.results));
  } catch (error) {
    dispatch(fetchDepotsFailure(error));
  }
};

// Filter depots:
export const filterDepot = async (filterData, dispatch) => {
  const { country, city, maxAmountStart, maxAmountEnd } = filterData;
  const countryID = country?.id;
  const cityID = city?.value;
  const minAmount = maxAmountStart;
  const maxAmount = maxAmountEnd;

  const params = new URLSearchParams({
    country: countryID || '',
    city: cityID || '',
    maxAmount_min: minAmount || '',
    maxAmount_max: maxAmount || '',
  });
  dispatch(fetchDepotsStart());
  try {
    const res = await request.get(`core/depot/?${params}`);
    dispatch(fetchDepotsSuccess(res?.data?.results));
  } catch (error) {
    dispatch(fetchDepotsFailure(error));
  }
};
