import {
  fetchAlaketStart,
  fetchAlaketSuccess,
  fetchAlaketFailure,
} from '../redux/slices/alaketSlice';
import { axiosInstance, request } from './axios';

// Fetch alaket:
export const fetchAlaket = async (dispatch) => {
  dispatch(fetchAlaketStart());
  try {
    const res = await request.get('core/alaket/');
    dispatch(fetchAlaketSuccess(res?.data?.results));
  } catch (error) {
    dispatch(fetchAlaketFailure(error));
  }
};

// Post Alaket:
export const postAlaket = async (data, photo, userID) => {
  const milliseconds = new Date().getMilliseconds();
  const formData = new FormData();

  const sendData = {
    date: data.date,
    client: String(userID),
    fromCity: Number(data.fromCity.value),
    toCity: Number(data.toCity.value),
    title: data.title || '',
    description: data.description || '',
    cost: data.negotiable ? Number(0) : Number(data.cost),
    type: data.type,
  };
  if (photo) {
    formData.append('image', photo);
    formData.append('title', milliseconds);
    try {
      const res = await axiosInstance.post('core/image/', formData);
      sendData.photo = res?.data?.image;
    } catch (error) {
      return error;
    }
  }
  try {
    await axiosInstance.post(`core/alaket/`, sendData);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

// Fetch Alaket Detail:
export const fetchAlaketDetail = async (id) => {
  try {
    const res = await request.get(`core/alaket/${id}/`);
    return { success: true, data: res?.data };
  } catch (error) {
    return { success: false, data: error };
  }
};
