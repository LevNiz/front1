import {
  fetchSearchRequestFailure,
  fetchSearchRequestStart,
  fetchSearchRequestSuccess,
} from '../redux/slices/searchRequestSlice';
import { axiosInstance, request } from './axios';

// fetch search request item:
export const fetchSearchRequest = async (dispatch, userID) => {
  dispatch(fetchSearchRequestStart());
  try {
    const res = await request.get('core/item_search_request/');
    const myRequests = res?.data?.results?.filter(
      (el) => el?.client?.id === userID
    );
    dispatch(fetchSearchRequestSuccess(myRequests));
  } catch (error) {
    dispatch(fetchSearchRequestFailure(error));
  }
};

// fetch search request detail:
export const FetchSearchRequestsDetail = async (id) => {
  try {
    const res = await request.get(`core/item_search_request/${id}`);
    return { success: true, data: res?.data };
  } catch (error) {
    return { success: false, data: error };
  }
};

// send post search request:
export const postSearchRequest = async (data, userID, file) => {
  const milliseconds = new Date().getMilliseconds();
  const formData = new FormData();

  const sendData = {
    client: userID,
    name: data.name,
    phone: data.phone,
    description: data.description,
    active: true,
  };
  if (file) {
    formData.append('image', file);
    formData.append('title', milliseconds);
    try {
      const res = await axiosInstance.post('core/image/', formData);
      sendData.photo = res?.data?.image;
    } catch (error) {
      return error;
    }
  }
  try {
    await axiosInstance.post(`core/item_search_request/`, sendData);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

// delete search request:
export const deleteSearchRequest = async (dispatch, id) => {
  dispatch(fetchSearchRequestStart());
  try {
    await axiosInstance.delete(`core/item_search_request/${id}`);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

// update search request:
export const updateSearchRequest = async (data, id, file) => {
  const milliseconds = new Date().getMilliseconds();
  const formData = new FormData();

  const sendData = {
    name: data.name,
    phone: data.phone,
    description: data.description,
    active: true,
  };
  if (file) {
    formData.append('image', file);
    formData.append('title', milliseconds);
    try {
      const res = await axiosInstance.post('core/image/', formData);
      sendData.photo = res?.data?.image;
    } catch (error) {
      return error;
    }
  }
  try {
    await axiosInstance.patch(`core/item_search_request/${id}/`, sendData);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};
