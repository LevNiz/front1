import {
  fetchAlaketStart,
  fetchAlaketSuccess,
  fetchAlaketFailure,
  fetchAlaketCountStart,
  fetchAlaketCountSuccess,
  fetchAlaketCountFailure,
} from '../redux/slices/alaketSlice';
import { axiosInstance, request } from './axios';

// Fetch alaket:
export const fetchAlaket = async (dispatch, page) => {
  dispatch(fetchAlaketStart());
  dispatch(fetchAlaketCountStart());
  try {
    const res = await request.get(`user/wallet/?page=${page}`);
    dispatch(fetchAlaketSuccess(res?.data?.results));
    dispatch(fetchAlaketCountSuccess(res?.data?.count));
  } catch (error) {
    dispatch(fetchAlaketFailure(error));
    dispatch(fetchAlaketCountFailure(error));
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

// Search alaket:
export const searchAlaket = async (title, dispatch) => {
  dispatch(fetchAlaketStart());
  try {
    const res = await request.get(`core/alaket/?search=${title}`);
    dispatch(fetchAlaketSuccess(res?.data?.results));
  } catch (error) {
    dispatch(fetchAlaketFailure(error));
  }
};

// Filter alaket:
export const filterAlaket = async (data, dispatch) => {
  const fromCity = data?.fromCity?.value;
  const toCity = data?.toCity?.value;
  const startDate = data?.startDate;
  const endDate = data?.endDate;

  const params = new URLSearchParams({
    fromCity: fromCity || '',
    toCity: toCity || '',
    startDate: startDate || '',
    endDate: endDate || '',
  });
  dispatch(fetchAlaketStart());
  try {
    const res = await request.get(`core/alaket/?${params}`);
    dispatch(fetchAlaketSuccess(res?.data?.results));
  } catch (error) {
    dispatch(fetchAlaketFailure(error));
  }
};
