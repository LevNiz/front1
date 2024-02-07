import {
  fetchWalletHistoryFailure,
  fetchWalletHistoryStart,
  fetchWalletHistorySuccess,
} from '../redux/slices/walletsSlice';
import { axiosInstance, request } from './axios';

// Fetch my wallet history:
export const fetchWalletHistory = async (dispatch, userID) => {
  dispatch(fetchWalletHistoryStart());
  try {
    const res = await request.get(
      `user/wallet_history/?client=${userID}&ordering=-date`
    );
    dispatch(fetchWalletHistorySuccess(res?.data?.results));
  } catch (error) {
    dispatch(fetchWalletHistoryFailure(error));
  }
};

// Fetch currency
export const fetchCurrency = async () => {
  try {
    const res = await request.get('category/currency/');
    return { success: true, data: res?.data?.results };
  } catch (error) {
    return { success: false };
  }
};

const postTopUpWallet = async (amount, user, currency) => {
  const lastItem = currency[currency.length - 1];
  const oneGBInLast = lastItem ? (lastItem.oneGBIn * amount).toFixed(1) : null;
  const sendData = {
    amount: oneGBInLast,
    description: 'Пополнение кошелка через оплату картой',
  };
  try {
    await axiosInstance.post(
      `user/wallet_amount_modify/${user?.id}/`,
      sendData
    );
  } catch (error) {
    alert(error);
  }
};
// pay for top up wallet
export const payForWallet = (amount, user, currency) => {
  let data = {
    token: import.meta.env.VITE_REACT_APP_FREE_DOM_PAY_TOKEN,
    payment: {
      order: `${amount}`,
      amount: amount,
      language: 'ru',
      currency: 'KGS',
      test: 1,
      description: 'Пополнение кошелка через оплату картой',
      options: {
        user: {
          email: `${user?.login}`,
          phone: `${user?.phone}` || 'Не указано',
        },
      },
    },
    successCallback: async () => {
      await postTopUpWallet(amount, user, currency);
    },
    errorCallback: async (payment) => {
      alert(payment);
    },
  };

  // eslint-disable-next-line no-undef
  var widget = new PayBox(data);
  widget.create();
};
