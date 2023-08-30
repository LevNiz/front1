import { request } from './axios';
import {
  fetchParcelsStart,
  fetchParcelsSuccess,
  fetchParcelsFailure,
} from '../redux/slices/parcelSlice';

// Fetch all Parcels:
export const FetchParcels = async (dispatch) => {
  dispatch(fetchParcelsStart());
  try {
    const res = await request.get(`core/package/`);
    dispatch(fetchParcelsSuccess(res?.data?.results));
    return { success: true, data: res?.data };
  } catch (error) {
    dispatch(fetchParcelsFailure(error));
  }
};

// Find parcel:
export const fetchSearchParcel = async (orderNum) => {
  try {
    const res = await request.get(`core/package/?orderNumber=${orderNum}`);
    return { success: true, parcelData: res?.data?.results }
} catch (error) {
    return { success: false, parcelData: error }
  }
};
