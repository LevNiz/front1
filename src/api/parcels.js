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

// Filter My parcels:
export const fetchFilterMyParcels = async (user_id, dispatch, data) => {
  dispatch(fetchParcelsStart());
  try {
    const { senderCity, senderCountry, receiverCity, receiverCountry } = data;
    const queryParams = new URLSearchParams({
      senderCountry: senderCountry?.id || '',
      senderCity: senderCity?.value || '',
      receiverCountry: receiverCountry?.id || '',
      receiverCity: receiverCity?.value || '',
    });
    const res = await request.get(`core/package/?${queryParams.toString()}`);
    const filteredParcels = res?.data?.results?.filter(
      (parcel) => parcel?.client?.id === user_id
    );
    dispatch(fetchParcelsSuccess(filteredParcels));
    return { success: true };
  } catch (error) {
    dispatch(fetchParcelsFailure(error));
    return { success: false };
  }
};

// Search My parcels:
export const fetchSearchMyParcels = async (orderNum, user_id, dispatch) => {
  dispatch(fetchParcelsStart());
  try {
    const queryParams = new URLSearchParams({
      orderNumber: orderNum,
    });
    const res = await request.get(`core/package/?${queryParams.toString()}`);
    const filteredParcels =
      res?.data?.results?.filter((parcel) => parcel?.client?.id === user_id) ||
      [];
    dispatch(fetchParcelsSuccess(filteredParcels));
    return { success: true };
  } catch (error) {
    dispatch(fetchParcelsFailure(error));
    return { success: false };
  }
};

// Sort parcels:
export const fetchSortMyParcels = async (param, user_id, dispatch) => {
  dispatch(fetchParcelsStart());
  try {
    const queryParams = new URLSearchParams({
      status: param,
    });
    const res = await request.get(`core/package/?${queryParams.toString()}`);
    const filteredParcels =
      res?.data?.results?.filter((parcel) => parcel?.client?.id === user_id) ||
      [];
    dispatch(fetchParcelsSuccess(filteredParcels));
  } catch (error) {
    dispatch(fetchParcelsFailure(error));
  }
};
