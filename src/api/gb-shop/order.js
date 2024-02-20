import { percentage } from '../../constants/currency';
import { axiosInstance } from '../axios';

// Post Order Item:
const orderItemPost = async (data, items, userData, state) => {
  const transformedItems = items.map((item) => ({
    color: item.color,
    item: item.item.id,
    memory: item.memory,
    quantity: item.quantity,
    size: item.size,
  }));

  const sendData = {
    items: transformedItems,
    totalCost: state,
    user: null,
    addresses: data?.address?.value,
    phone: userData?.phone || null,
    lat: null,
    lon: null,
    comment: data?.comment || '',
    storeName: null,
    storeLogo: null,
    status: 'new',
    isoptovik: false,
    bonus: 0.0,
    pay_status: true,
    client: userData?.id,
  };
  try {
    await axiosInstance.post('/core/order/', sendData);
  } catch (error) {
    alert(error);
  }
};

// Payment FreeDomPay
export const payForOrder = (orderData, items, userData, state, amount) => {
  const totalAmount = Number(amount) + Number(amount) * percentage;
  let data = {
    token: import.meta.env.VITE_REACT_APP_FREE_DOM_PAY_TOKEN,
    payment: {
      order: `${orderData?.address?.value}`,
      amount: totalAmount,
      language: 'ru',
      currency: 'KGS',
      description: `Оплата за покупку в GB-Shop`,
      options: {
        user: {
          email: `${userData?.login}`,
          phone: `${userData?.phone}` || 'Не указано',
        },
      },
    },
    successCallback: async () => {
      await orderItemPost(orderData, items, userData, state);
    },
    errorCallback: async (payment) => {
      console.error(payment);
    },
  };

  // eslint-disable-next-line no-undef
  var widget = new PayBox(data);
  widget.create();
};
