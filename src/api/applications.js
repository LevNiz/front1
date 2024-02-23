import { axiosInstance, request } from './axios';
import {
  fetchApplicationStart,
  fetchApplicationSuccess,
  fetchApplicationFailure,
  fetchArchiveApplicationStart,
  fetchArchiveApplicationSuccess,
  fetchArchiveApplicationFailure,
} from '../redux/slices/applicationSlice';

// post application:
export const postApplications = async (data, userID) => {
  if (data.orderData) {
    data = { ...data.orderData, ...data };
  }
  const sendData = {
    senderName: data.serviceName,
    senderPhone: '-',
    receiverName: data.receiver.receiverName,
    receiverPhone: data.receiver.phone,
    serviceName: data.serviceName,
    client: userID,
    fromCity: data.senderCity.value,
    toCity: data.receiverCity.value,
    fromCountry: data.senderCity.fromCountry,
    toCountry: data.receiverCity.toCountry,
    packageData:
      data.parcelSize.value !== 'custom' &&
      data.parcelSize.value !== 'measurement'
        ? data.parcelSize.value
        : null,
    packageType: null,
    dateSending: data.dateArrival,
    phone: data.receiver.phone,
    extraServices: data.extraServices || [],
    premium: data.tariff === 2 ? true : false,
    comment: data.comment,
    address: data.receiver.id,
    height: data.parcelSize.value === 'custom' ? Number(data.height) : 0,
    width: data.parcelSize.value === 'custom' ? Number(data.width) : 0,
    length: data.parcelSize.value === 'custom' ? Number(data.length) : 0,
    cost: Number(data.cost),
    weight:
      data.parcelSize.value === 'custom'
        ? Number(data.scopeWeight)
        : data.parcelSize.value === 'measurement'
        ? Number(0)
        : data.parcelSize.weight,
  };
  try {
    await axiosInstance.post('core/request/', sendData);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

export const updateApplications = async (data, userID, id) => {
  const sendData = {
    senderName: data.serviceName,
    senderPhone: '-',
    receiverName: data.receiver.receiverName,
    receiverPhone: data.receiver.phone,
    serviceName: data.serviceName,
    client: userID,
    fromCity: data.senderCity.value,
    toCity: data.receiverCity.value,
    fromCountry: data.senderCity.fromCountry,
    toCountry: data.receiverCity.toCountry,
    packageData:
      data.parcelSize.value !== 'custom' &&
      data.parcelSize.value !== 'measurement'
        ? data.parcelSize.value
        : null,
    packageType: null,
    dateSending: data.dateArrival,
    phone: data.receiver.phone,
    extraServices: data.extraServices || [],
    premium: data.selectedTariff === 2 ? true : false,
    comment: data.comment,
    address: data.receiver.id,
    height: data.parcelSize.value === 'custom' ? Number(data.height) : 0,
    width: data.parcelSize.value === 'custom' ? Number(data.width) : 0,
    length: data.parcelSize.value === 'custom' ? Number(data.length) : 0,
    cost: Number(data.cost),
    weight:
      data.parcelSize.value === 'custom'
        ? Number(data.scopeWeight)
        : data.parcelSize.value === 'measurement'
        ? Number(0)
        : data.parcelSize.weight,
  };
  try {
    await axiosInstance.patch(`core/request/${id}/`, sendData);
    return { success: true };
  } catch (error) {
    return { success: true };
  }
};

export const fetchApplications = async (userID, dispatch) => {
  dispatch(fetchApplicationStart());
  try {
    const res = await request.get(`core/request/?client=${userID}`);
    const applications = res?.data?.results?.filter(
      (el) => el?.archive === false
    );
    dispatch(fetchApplicationSuccess(applications));
    return { data: res?.data };
  } catch (error) {
    dispatch(fetchApplicationFailure(error));
  }
};

export const fetchApplicationsNextPage = async (dispatch, next, items) => {
  try {
    const res = await request.get(`${next}`);
    const results = res?.data?.results;
    const moreItems = [...items, ...results];
    dispatch(fetchApplicationSuccess(moreItems));
    return { data: res?.data };
  } catch (error) {
    dispatch(fetchApplicationFailure(error));
    return { success: false };
  }
};

export const fetchApplicationsDetail = async (id) => {
  try {
    const res = await request.get(`core/request/${id}/`);
    return { success: true, data: res?.data };
  } catch (error) {
    return { success: false };
  }
};

export const fetchArchiveApplications = async (userID, dispatch) => {
  dispatch(fetchArchiveApplicationStart());
  try {
    const res = await request.get(
      `core/request/?client=${userID}&archive=true`
    );
    dispatch(fetchArchiveApplicationSuccess(res?.data?.results));
    return { data: res?.data };
  } catch (error) {
    dispatch(fetchArchiveApplicationFailure(error));
  }
};
