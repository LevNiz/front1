import { percentage } from '../constants/currency';
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
    return { data: res?.data };
  } catch (error) {
    dispatch(fetchBuyRequestFailure(error));
  }
};

export const fetchBuyRequestsNextPage = async (dispatch, next, items) => {
  try {
    const res = await request.get(`${next}`);
    const results = res?.data?.results;
    const moreItems = [...items, ...results];
    dispatch(fetchBuyRequestSuccess(moreItems));
    return { data: res?.data };
  } catch (error) {
    dispatch(fetchBuyRequestFailure(error));
    return { success: false };
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
export const payForBuyRequest = (amount, user, item, handleFetchBuyRequest) => {
  const totalAmount = Number(amount) + Number(amount) * percentage;
  let data = {
    token: import.meta.env.VITE_REACT_APP_FREE_DOM_PAY_TOKEN,
    payment: {
      order: `${amount + item?.id}`,
      amount: totalAmount,
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
      handleFetchBuyRequest();
    },
    errorCallback: async (payment) => {
      console.error(payment);
    },
  };

  // eslint-disable-next-line no-undef
  var widget = new PayBox(data);
  widget.create();
};
