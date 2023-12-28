// Post Order Item:
const orderItemPost = async (data, items, userID, state) => {
  const sendData = {
    items: items,
    totalCost: state,
    user: null,
    addresses: data?.address?.value,
    phone: '',
    lat: null,
    lon: null,
    comment: data?.comment || '',
    storeName: null,
    storeLogo: null,
    status: 'new',
    isoptovik: false,
    bonus: 0.0,
    pay_status: true,
    client: userID,
  };
  console.log(sendData);
};

// Payment FreeDomPay
export const payForParcel = (orderData, items, userID, state) => {
  orderItemPost(orderData, items, userID, state);
  var data = {
    token: import.meta.env.VITE_REACT_APP_FREE_DOM_PAY_TOKEN,
    payment: {
      order: '1',
      amount: 1.1,
      currency: 'KG',
      description: `sdcsc`,
      expires_at: '2020-12-12 00:00:00',
      param1: 'string',
      param2: 'string',
      param3: 'string',
      test: 0,
      options: items,
    },
    successCallback: async () => {
      await orderItemPost();
    },
    errorCallback: async (payment) => {
      alert(payment);
    },
  };

  // eslint-disable-next-line no-undef
  var widget = new PayBox(data);
  widget.create();
};
