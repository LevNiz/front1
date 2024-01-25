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
    const res = await request.get(`core/item_search_request/?client=${userID}`);
    dispatch(fetchSearchRequestSuccess(res?.data?.results));
  } catch (error) {
    dispatch(fetchSearchRequestFailure(error));
  }
};

// fetch search request item detail:
export const fetchSearchRequestDetail = async (id) => {
  try {
    const res = await request.get(`core/item_search_request/${id}/`);
    return { success: true, data: res?.data };
  } catch (error) {
    return { success: false, data: error };
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
export const uploadPhotos = async (blocks) => {
  const wantedItems = [];

  for (const block of blocks) {
    if (block?.photo instanceof File) {
      const photoURL = await uploadPhoto(block?.photo);
      wantedItems.push({ description: block?.description, photo: photoURL });
    } else {
      wantedItems.push({
        description: block?.description,
        photo: block?.photo,
      });
    }
  }
  return wantedItems;
};

const uploadPhoto = async (photo) => {
  const milliseconds = new Date().getMilliseconds();
  const formData = new FormData();
  formData.append('image', photo);
  formData.append('title', milliseconds);
  try {
    const res = await axiosInstance.post('core/image/', formData, {
      headers: {
        'Content-type': 'multipart/form-data',
      },
    });
    return res?.data?.image;
  } catch (error) {
    return error;
  }
};

export const postSearchRequest = async (data, userID, wantedItems) => {
  const sendData = {
    client: userID,
    name: data.name,
    phone: data.phone,
    wantedItems: wantedItems,
    active: true,
  };
  try {
    if (wantedItems?.length > 0) {
      await axiosInstance.post('core/item_search_request/', sendData);
      return { success: true };
    }
  } catch (error) {
    return { success: false };
  }
};

export const updateSearchRequest = async (data, wantedItems, id) => {
  const sendData = {
    name: data.name,
    phone: data.phone,
    wantedItems: wantedItems,
  };
  try {
    if (wantedItems?.length > 0) {
      await axiosInstance.patch(`core/item_search_request/${id}/`, sendData);
      return { success: true };
    }
  } catch (error) {
    return { success: false };
  }
};

// delete search request:
export const deleteSearchRequest = async (id, setIsLoading, setModalOpen) => {
  setIsLoading(true);
  setModalOpen(false);
  try {
    await axiosInstance.delete(`core/item_search_request/${id}`);
    setIsLoading(false);
    return { success: true };
  } catch (error) {
    setIsLoading(false);
    return { success: false };
  }
};
