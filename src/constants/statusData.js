// Buyer request status:
export const buyRequestStatus = {
  created: {
    name: 'Создан',
    statusStyle: 'bg-colPurple2',
  },
  confirmed: {
    name: 'Принят',
    statusStyle: 'bg-colGreen2',
  },
  in_progress: {
    name: 'В процессе',
    statusStyle: 'bg-colOrange',
  },
  bought: {
    name: 'Куплен',
    statusStyle: 'bg-colBlue',
  },
  sent: {
    name: 'Отправлен',
    statusStyle: 'bg-colYellow',
  },
};

// Parcel status:
export const parcelStatus = {
  created: {
    name: 'Создан',
    statusStyle: 'bg-colPurple2',
  },
  arrived: {
    name: 'Получен',
    statusStyle: 'bg-colBlue',
  },
  on_way: {
    name: 'В пути',
    statusStyle: 'bg-colGreen2',
  },
  done: {
    name: 'Завершён',
    statusStyle: 'bg-colOrange',
  },
};

// Payment status:
export const paymentStatus = {
  paid: {
    name: 'Оплачено',
    statusStyle: 'bg-colGreen2',
  },
  unpaid: {
    name: 'Не оплачено',
    statusStyle: 'bg-colOrange',
  },
};
