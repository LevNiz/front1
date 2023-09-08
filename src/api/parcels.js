import { request } from './axios';
import {
  fetchParcelsStart,
  fetchParcelsSuccess,
  fetchParcelsFailure,
} from '../redux/slices/parcelSlice';

// Fetch all Parcels:
export const FetchParcels = async (dispatch, user_id) => {
  dispatch(fetchParcelsStart());
  try {
    const res = await request.get(`core/package/`);
    const filteredParcels = res?.data?.results?.filter(
      (parcel) => parcel?.client?.id === user_id
    );
    dispatch(fetchParcelsSuccess(filteredParcels));
  } catch (error) {
    dispatch(fetchParcelsFailure(error));
  }
};

// Fetch Parcels detail:
export const fetchParcelDetail = async (id) => {
  try {
    const res = await request.get(`core/package/${id}/`);
    return { success: true, data: res?.data };
  } catch (error) {
    return { success: false, data: error };
  }
};

// Find parcel:
export const fetchSearchParcel = async (orderNum) => {
  try {
    const res = await request.get(`core/package/?orderNumber=${orderNum}`);
    return { success: true, parcelData: res?.data?.results };
  } catch (error) {
    return { success: false, parcelData: error };
  }
};
