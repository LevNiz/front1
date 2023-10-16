import { axiosInstance } from './axios';

// post Request:
export const postRequest = async (data, userID) => {
  if (data.orderData) {
    data = { ...data.orderData, ...data };
  }

  const sendData = {
    senderName: data.senderName,
    senderPhone: data.senderPhone,
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
    phone: data.senderPhone,
    comment: data.comment,
    height: Number(data.height) || null,
    width: Number(data.width) || null,
    length: Number(data.length) || null,
    cost: Number(data.cost),
    weight: Number(data.scopeWeight),
  };
  try {
    await axiosInstance.post('core/request/', sendData);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};
