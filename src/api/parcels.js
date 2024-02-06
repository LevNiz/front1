import { axiosInstance, request } from './axios';
import {
  fetchParcelsStart,
  fetchParcelsSuccess,
  fetchParcelsFailure,
  fetchSavedParcelsStart,
  fetchSavedParcelsSuccess,
  fetchSavedParcelsFailure,
} from '../redux/slices/parcelSlice';

// Fetch all Parcels:
export const FetchParcels = async (dispatch, userID) => {
  dispatch(fetchParcelsStart());
  try {
    const res = await request.get(`core/package/?client=${userID}`);
    dispatch(fetchParcelsSuccess(res?.data?.results));
    return { success: true, count: res?.data?.count };
  } catch (error) {
    dispatch(fetchParcelsFailure(error));
  }
};

export const fetchMoreParcels = async (empty, page) => {
  try {
    const res = await request.get(`/core/depot/?page=${page}`);
    return { success: true, data: res?.data?.results };
  } catch (error) {
    return { success: false };
  }
};

export const PatchParcelsPaymentStatus = async (id) => {
  try {
    await axiosInstance.patch(`core/package/${id}/`, {
      paymentStatus: 'paid',
    });
    return { success: true };
  } catch (error) {
    return { success: false };
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
export const fetchFilterSavedParcels = async (userID, dispatch, data) => {
  dispatch(fetchSavedParcelsStart());
  try {
    const { senderCity, senderCountry, receiverCity, receiverCountry } = data;
    const queryParams = new URLSearchParams({
      senderCountry: senderCountry?.value || '',
      senderCity: senderCity?.value || '',
      receiverCountry: receiverCountry?.id || '',
      receiverCity: receiverCity?.value || '',
    });
    const res = await request.get(
      `core/package/?${queryParams.toString()}&client=${userID}&ordering=-dateCreated`
    );
    dispatch(fetchSavedParcelsSuccess(res?.data?.results));
    return { success: true };
  } catch (error) {
    dispatch(fetchSavedParcelsFailure(error));
    return { success: false };
  }
};

// Search My parcels:
export const fetchSearchSavedParcels = async (orderNum, userID, dispatch) => {
  dispatch(fetchSavedParcelsStart());
  try {
    const queryParams = new URLSearchParams({
      orderNumber: orderNum,
    });
    const res = await request.get(
      `core/package/?${queryParams.toString()}&clients=${userID}`
    );
    dispatch(fetchSavedParcelsSuccess(res?.data?.results));
    return { success: true };
  } catch (error) {
    dispatch(fetchSavedParcelsFailure(error));
    return { success: false };
  }
};

// Sort parcels:
export const fetchSortSavedParcels = async (param, userID, dispatch) => {
  dispatch(fetchSavedParcelsStart());
  try {
    const queryParams = new URLSearchParams({
      status: param,
    });
    const res = await request.get(
      `core/package/?${queryParams.toString()}&clients=${userID}&ordering=-dateCreated`
    );
    dispatch(fetchSavedParcelsSuccess(res?.data?.results));
  } catch (error) {
    dispatch(fetchSavedParcelsFailure(error));
  }
};

// Fetch all Parcels:
export const FetchSavedParcels = async (dispatch, userID) => {
  dispatch(fetchSavedParcelsStart());
  try {
    const res = await request.get(`core/package/`);
    const filteredParcels = res?.data?.results?.filter((parcel) =>
      parcel?.clients?.includes(userID)
    );
    dispatch(fetchSavedParcelsSuccess(filteredParcels));
  } catch (error) {
    dispatch(fetchSavedParcelsFailure(error));
  }
};

// Save parcel:
export const fetchSaveParcel = async (data) => {
  try {
    await axiosInstance.post('core/savePackage/', data);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

// Parcel category:
export const fetchParcelCategories = async () => {
  try {
    const res = await request.get('core/package_data');
    return { success: true, data: res?.data?.results };
  } catch (error) {
    return { success: false, data: error };
  }
};
