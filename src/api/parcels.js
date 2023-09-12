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

export const fetchFilterMyParcels = async (
  orderNum,
  user_id,
  dispatch,
  data,
) => {
  dispatch(fetchParcelsStart());
  try {
    const senderCity = data.senderCity.value || '';
    const senderCountry = data.senderCountry.id || '';
    const receiverCity = data.receiverCity.value || '';
    const receiverCountry = data.receiverCountry.id || '';
    const res = await request.get(
      `core/package/?senderCountry=${senderCountry}&senderCity=${senderCity}&receiverCountry=${receiverCountry}&receiverCity=${receiverCity}&orderNumber=${orderNum}`
    );
    const filteredParcels = res?.data?.results?.filter(
      (parcel) => parcel?.client?.id === user_id
    );
    dispatch(fetchParcelsSuccess(filteredParcels));
    return { success: true }
  } catch (error) {
    dispatch(fetchParcelsFailure(error));
    return { success: false }
  }
};

// Sort parcels:
export const fetchSortParcels = async (param, user_id, dispatch) => {
  dispatch(fetchParcelsStart());
  try {
    const res = await request.get(`core/package/?status=${param}`);
    const filteredParcels = res?.data?.results?.filter(
      (parcel) => parcel?.client?.id === user_id
    );
    dispatch(fetchParcelsSuccess(filteredParcels));
  } catch (error) {
    dispatch(fetchParcelsFailure(error));
  }
};
