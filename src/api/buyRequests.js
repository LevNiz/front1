import {
  fetchBuyRequestFailure,
  fetchBuyRequestStart,
  fetchBuyRequestSuccess,
} from '../redux/slices/buyRequestSlice';
import { axiosInstance, request } from './axios';

// Fetch Buyer requests:
export const FetchBuyRequests = async (dispatch, userID) => {
  dispatch(fetchBuyRequestStart());
  try {
    const res = await request.get('core/buyer_request/');
    const filteredData = res?.data?.results?.filter(
      (el) => el?.client?.id === userID
    );
    dispatch(fetchBuyRequestSuccess(filteredData));
  } catch (error) {
    dispatch(fetchBuyRequestFailure(error));
  }
};

// Fetch detail Buyer request:
export const FetchBuyRequestsDetail = async (id) => {
  try {
    const res = await request.get(`core/buyer_request/${id}`);
    return { success: true, data: res?.data };
  } catch (error) {
    return { success: false, data: error };
  }
};

// Post Buyer requests:
export const postBuyRequest = async (data, userID) => {
  try {
    const sendData = {
      name: data.name,
      phone: data.phone,
      link: data.link,
      client: Number(userID),
      status: 'created',
    };
    await axiosInstance.post('core/buyer_request/', sendData);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

// Delete Address:
export const deleteBuyRequest = async (id) => {
  try {
    await axiosInstance.delete(`core/buyer_request/${id}`);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

// Update buyRequest:
export const updateBuyRequest = async (data, id) => {
  const sendData = {
    name: data.name,
    phone: data.phone,
    link: data.link,
  };
  try {
    await axiosInstance.patch(`core/buyer_request/${id}/`, sendData);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};
