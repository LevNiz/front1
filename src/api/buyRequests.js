import {
  fetchBuyRequestFailure,
  fetchBuyRequestStart,
  fetchBuyRequestSuccess,
} from '../redux/slices/buyRequestSlice';
import { axiosInstance, request } from './axios';

// Fetch Buyer requests:
export const FetchBuyRequests = async (dispatch, userID) => {
  dispatch(fetchBuyRequestStart());
  try {
    const res = await request.get(
      `core/buyer_request/?client=${userID}&ordering=-dateCreated`
    );
    dispatch(fetchBuyRequestSuccess(res?.data?.results));
  } catch (error) {
    dispatch(fetchBuyRequestFailure(error));
  }
};

// Fetch detail Buyer request:
export const FetchBuyRequestsDetail = async (id) => {
  try {
    const res = await request.get(`core/buyer_request/${id}`);
    return { success: true, data: res?.data };
  } catch (error) {
    return { success: false, data: error };
  }
};

// Post Buyer requests:
export const postBuyRequest = async (data, userID, blocks) => {
  try {
    const sendData = {
      name: data.name,
      phone: data.phone,
      client: Number(userID),
      info: data?.info,
      status: 'created',
      cart_request: blocks,
    };
    await axiosInstance.post('core/buyer_request/', sendData);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

// PatchBuyer requests:
export const updateBuyRequest = async (data, blocks, id) => {
  try {
    const sendData = {
      name: data.name,
      phone: data.phone,
      info: data.info,
      cart_request: blocks,
    };
    await axiosInstance.patch(`core/buyer_request/${id}/`, sendData);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

// Delete Address:
export const deleteBuyRequest = async (dispatch, id) => {
  dispatch(fetchBuyRequestStart());
  try {
    await axiosInstance.delete(`core/buyer_request/${id}`);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

// PatchBuyer requests:
export const patchPaymentStatus = async (id) => {
  try {
    await axiosInstance.patch(`core/buyer_request/${id}/`, { paid: true });
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

// Pay For Buy Request:
export const payForBuyRequest = (amount, user, item) => {
  let data = {
    token: import.meta.env.VITE_REACT_APP_FREE_DOM_PAY_TOKEN,
    payment: {
      order: `${amount}`,
      amount: amount,
      language: 'ru',
      currency: 'KGS',
      description: 'Оплата за заявку на покупку товара',
      options: {
        user: {
          email: `${user?.login}`,
          phone: `${user?.phone}` || 'Не указано',
        },
      },
    },
    successCallback: async () => {
      await patchPaymentStatus(item?.id);
    },
    errorCallback: async (payment) => {
      console.error(payment);
    },
  };

  // eslint-disable-next-line no-undef
  var widget = new PayBox(data);
  widget.create();
};
