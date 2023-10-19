import { request } from './axios';
import {
  fetchAddressStart,
  fetchAddressSuccess,
  fetchAddressFailure,
} from './../redux/slices/addressesSlice';

// Fetch Addresses:
export const fetchAddresses = async (userID, dispatch) => {
  dispatch(fetchAddressStart());
  try {
    const res = await request.get('/core/addresses/');
    const myAddresses = res?.data?.results?.filter(
      (address) => address?.user?.id === userID
    );
    dispatch(fetchAddressSuccess(myAddresses));
  } catch (error) {
    dispatch(fetchAddressFailure(error));
  }
};
