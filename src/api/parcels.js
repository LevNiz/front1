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
