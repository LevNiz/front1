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
export const postBuyRequest = async (data, userID, blocks) => {
  try {
    const sendData = {
      name: data.name,
      phone: data.phone,
      client: Number(userID),
      status: 'created',
      cart_request: blocks,
    };
    await axiosInstance.post('core/buyer_request/', sendData);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

// PatchBuyer requests:
export const updateBuyRequest = async (data, blocks, id) => {
  try {
    const sendData = {
      name: data.name,
      phone: data.phone,
      cart_request: blocks,
    };
    await axiosInstance.patch(`core/buyer_request/${id}/`, sendData);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

// Delete Address:
export const deleteBuyRequest = async (dispatch, id) => {
  dispatch(fetchBuyRequestStart());
  try {
    await axiosInstance.delete(`core/buyer_request/${id}`);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};
