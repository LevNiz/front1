import { axiosInstance } from './axios';

// post Request:
export const postRequest = async (data) => {
  console.log(data);
  const sendData = {
    senderName: data.senderName,
    senderPhone: data.senderPhone,
    receiverName: data.receiverName,
    receiverPhone: data.receiverPhone,
    serviceName: data.serviceName,
    fromCity: data.orderData.senderCity.value,
    toCity: data.orderData.receiverCity.value,
    fromCountry: data.orderData.senderCity.fromCountry,
    toCountry: data.orderData.receiverCity.toCountry,
    packageData:
      data.orderData.parcelSize.value !== 'custom'
        ? data.orderData.parcelSize.value
        : null,
    packageType: null,
    dateSending: data.dateArrival,
    phone: data.senderPhone,
    comment: data.comment,
    height: Number(data.orderData.height) || null,
    width: Number(data.orderData.width) || null,
    length: Number(data.orderData.length) || null,
    cost: Number(data.cost),
    // weight: Number(data.weight),
  };
  console.log(sendData);
  try {
    // const res = axiosInstance.post('core/request/', sendData);
    console.log('Success!');
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};
