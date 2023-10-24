import { axiosInstance, request } from './axios';
import {
  fetchAddressStart,
  fetchAddressSuccess,
  fetchAddressFailure,
} from './../redux/slices/addressesSlice';

// Fetch Addresses:
export const fetchAddresses = async (userID, dispatch) => {
  dispatch(fetchAddressStart());
  try {
    const res = await request.get('core/addresses/');
    const myAddresses = res?.data?.results?.filter(
      (address) => address?.user?.id === userID
    );
    dispatch(fetchAddressSuccess(myAddresses));
  } catch (error) {
    dispatch(fetchAddressFailure(error));
  }
};

// Fetch Addresses Item:
export const fetchAddressesItem = async (id) => {
  try {
    const res = await request.get(`core/addresses/${id}`);
    return { success: true, data: res?.data };
  } catch (error) {
    return { success: false, data: error };
  }
};

// Post Addresses:
export const postAddress = async (data, userID) => {
  const {
    type,
    depot,
    country,
    city,
    address,
    phone,
    receiverName,
    nameAddress,
  } = data;
  const addressData = {
    type: type,
    depot: type === 'depot' ? depot.value : null,
    country: type === 'custom' ? country.value : depot.country,
    city: type === 'custom' ? city.value : depot.city,
    address: type === 'custom' ? address : depot.address,
    phone: phone || '',
    receiverName: receiverName || '',
    nameAddress: nameAddress || '',
    user: userID,
  };
  try {
    await axiosInstance.post('core/addresses/', addressData);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

// Update Address:
export const updateAddress = async (data, userID, id) => {
  const {
    type,
    depot,
    country,
    city,
    address,
    phone,
    receiverName,
    nameAddress,
  } = data;
  const addressData = {
    type: type,
    depot: type === 'depot' ? depot.value : null,
    country: type === 'custom' ? country.value : depot.country,
    city: type === 'custom' ? city.value : depot.city,
    address: type === 'custom' ? address : depot.address,
    phone: phone || '',
    receiverName: receiverName || '',
    nameAddress: nameAddress || '',
    user: userID,
  };
  try {
    await axiosInstance.patch(`core/addresses/${id}/`, addressData);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

// Delete Address:
export const deleteAddress = async (addressID) => {
  try {
    await axiosInstance.delete(`core/addresses/${addressID}`);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};
