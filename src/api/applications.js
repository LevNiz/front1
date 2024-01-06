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
  console.log(data);
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
      data.parcelSize.value !== ('custom' && 'measurement')
        ? data.parcelSize.value
        : null,
    packageType: null,
    dateSending: data.dateArrival,
    phone: data.receiverPhone,
    premium: data.tariff === 2 ? true : false,
    comment: data.comment,
    height: Number(data.height) || 0,
    width: Number(data.width) || 0,
    length: Number(data.length) || 0,
    cost: Number(data.cost),
    weight:
      data.parcelSize.value === 'custom'
        ? Number(data.scopeWeight)
        : data.parcelSize.weight,
  };
  console.log(sendData);
  try {
    // await axiosInstance.post('core/request/', sendData);
    console.log('Success');
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

// Get applications:
export const fetchApplications = async (userID, dispatch) => {
  dispatch(fetchApplicationStart());
  try {
    const res = await request.get(`core/request/?client=${userID}`);
    const activeApplications = res?.data?.results?.filter(
      (el) => el?.archive === false
    );
    dispatch(fetchApplicationSuccess(activeApplications));
  } catch (error) {
    dispatch(fetchApplicationFailure(error));
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

// Get applications:
export const fetchArchiveApplications = async (userID, dispatch) => {
  dispatch(fetchArchiveApplicationStart());
  try {
    const res = await request.get(`core/request/?client=${userID}`);
    const archiveApplications = res?.data?.results?.filter(
      (el) => el?.archive === true
    );
    dispatch(fetchArchiveApplicationSuccess(archiveApplications));
  } catch (error) {
    dispatch(fetchArchiveApplicationFailure(error));
  }
};
