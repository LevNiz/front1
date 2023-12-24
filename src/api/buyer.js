import { axiosInstance, request } from './axios';
import {
  fetchBuyerFailure,
  fetchBuyerStart,
  fetchBuyerSuccess,
} from '../redux/slices/buyerSlice';

// Fetch buyers:
export const fetchBuyers = async (dispatch) => {
  dispatch(fetchBuyerStart());
  try {
    const res = await request.get('user/buyer/');
    dispatch(fetchBuyerSuccess(res?.data?.results));
  } catch (error) {
    dispatch(fetchBuyerFailure(error));
  }
};

// Fetch buyers:
export const fetchBuyersDetail = async (id) => {
  try {
    const res = await request.get(`user/buyer/${id}/`);
    return { success: true, data: res?.data };
  } catch (error) {
    return { success: false, data: error };
  }
};

// Search depot:
export const searchBuyer = async (buyerName, dispatch) => {
  dispatch(fetchBuyerStart());
  try {
    const res = await request.get(`user/buyer/?search=${buyerName}`);
    dispatch(fetchBuyerSuccess(res?.data?.results));
  } catch (error) {
    dispatch(fetchBuyerFailure(error));
  }
};

// Filter depots:
export const filterBuyer = async (filterData, dispatch) => {
  const { country, websites } = filterData;
  const countryID = country?.value || '';
  const websiteID = websites?.value || '';
  dispatch(fetchBuyerStart());
  try {
    const res = await request.get(
      `user/buyer/?${countryID && `countries=${countryID}`}${
        websiteID && `&websites=${websiteID}`
      }`
    );
    dispatch(fetchBuyerSuccess(res?.data?.results));
  } catch (error) {
    dispatch(fetchBuyerFailure(error));
  }
};

// Stay Buyer post request:
export const postStayBuyer = async (data, userID, passport, passportSelfie) => {
  const sendData = {
    client: userID,
    comment: data.comment || '',
    accepted: false,
    fullname: data.fullname,
    about_yourself: '',
    experience: data.experience,
    commission: data.commission,
    redemption_speed: data.redemption_speed,
    country: data?.country?.value,
    shop_countries: [],
    paymentType: data.paymentType,
    search_product: '',
    rating: 0.0,
    contacts: {
      phone: data.phone,
      email: data.email,
      messangers: '',
    },
  };

  const uploadImage = async (image) => {
    const milliseconds = new Date().getMilliseconds();
    const formData = new FormData();
    formData.append('image', image);
    formData.append('title', milliseconds);

    return axiosInstance
      .post('core/image/', formData, {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      })
      .then((res) => res?.data?.image)
      .catch((error) => {
        throw error;
      });
  };

  try {
    const [passportImage, passportSelfieImage] = await Promise.all([
      passport && uploadImage(passport),
      passportSelfie && uploadImage(passportSelfie),
    ]);

    if (passportImage) {
      sendData.passport_front = passportImage;
    }
    if (passportSelfieImage) {
      sendData.passport_back = passportSelfieImage;
    }
    await axiosInstance.post(
      'https://givbox.ru/givbox/user/becomeBuyer/',
      sendData
    );
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};
