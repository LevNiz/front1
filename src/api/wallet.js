import {
  fetchWalletHistoryFailure,
  fetchWalletHistoryStart,
  fetchWalletHistorySuccess,
} from '../redux/slices/walletsSlice';
import { request } from './axios';

// My Wallet history:
export const fetchWalletHistory = async (dispatch, userID) => {
  dispatch(fetchWalletHistoryStart);
  try {
    const res = await request.get(`user/wallet_history/?client=${userID}`);
    dispatch(fetchWalletHistorySuccess(res?.data?.results));
  } catch (error) {
    dispatch(fetchWalletHistoryFailure(error));
  }
};
