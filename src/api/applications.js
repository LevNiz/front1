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
    receiverName: data.receiverName,
    receiverPhone: data.receiverPhone,
    serviceName: data.serviceName,
    client: userID,
    fromCity: data.senderCity.value,
    toCity: data.receiverCity.value,
    fromCountry: data.senderCity.fromCountry,
    toCountry: data.receiverCity.toCountry,
    packageData:
      data.parcelSize.value !== 'custom' ? data.parcelSize.value : null,
    packageType: null,
    dateSending: data.dateArrival,
    phone: data.receiverPhone,
    comment: data.comment,
    height: Number(data.height) || null,
    width: Number(data.width) || null,
    length: Number(data.length) || null,
    cost: Number(data.cost),
    weight:
      data.parcelSize.value === 'custom'
        ? Number(data.scopeWeight)
        : data.parcelSize.weight,
  };
  try {
    await axiosInstance.post('core/request/', sendData);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

// Get applications:
export const fetchApplications = async (userID, dispatch) => {
  dispatch(fetchApplicationStart());
  try {
    const res = await request.get('core/request/');
    const myApplications = res?.data?.results?.filter(
      (el) => el?.client?.id === userID
    );
    dispatch(fetchApplicationSuccess(myApplications));
  } catch (error) {
    dispatch(fetchApplicationFailure(error));
  }
};

// Get applications:
export const fetchArchiveApplications = async (userID, dispatch) => {
  dispatch(fetchArchiveApplicationStart());
  try {
    const res = await request.get('core/request/');
    const myApplications = res?.data?.results?.filter(
      (el) => el?.client?.id === userID
    );
    const archiveApplications = myApplications?.filter(
      (el) => el?.senderName === true
    );
    dispatch(fetchArchiveApplicationSuccess(archiveApplications));
  } catch (error) {
    dispatch(fetchArchiveApplicationFailure(error));
  }
};
