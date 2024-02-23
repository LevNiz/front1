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
    return { data: res?.data };
  } catch (error) {
    dispatch(fetchDepotsFailure(error));
  }
};

export const fetchDepotsNextPage = async (dispatch, next, items) => {
  try {
    const res = await request.get(`${next}`);
    const results = res?.data?.results;
    const moreItems = [...items, ...results];
    dispatch(fetchDepotsSuccess(moreItems));
    return { data: res?.data };
  } catch (error) {
    dispatch(fetchDepotsFailure(error));
    return { success: false };
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
  const countryID = country?.value;
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

// Fetch all depots:
const fetchDepotsPage = async (page) => {
  try {
    const res = await request.get(`/core/depot/?page=${page}`);
    return { success: true, data: res?.data?.results, next: res?.data?.next };
  } catch (error) {
    return { success: false };
  }
};

export const fetchAllDepots = async () => {
  let allDepotsData = [];
  let page = 1;

  const fetchData = async () => {
    const { data, next } = await fetchDepotsPage(page);

    if (data) {
      allDepotsData = [...allDepotsData, ...data];
      page += 1;

      if (next !== null) {
        await fetchData();
      }
    }
  };

  await fetchData();
  return allDepotsData;
};
