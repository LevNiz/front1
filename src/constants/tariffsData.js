import standart from './../assets/icons/standart.svg';
import standartActive from './../assets/icons/standartActive.svg';
import premium from './../assets/icons/premium.svg';
import premiumActive from './../assets/icons/premiumActive.svg';
import arrow from './../assets/icons/arrow-down.svg';
import location from './../assets/icons/location3.svg';
import hoveredLocation from './../assets/icons/location-white.svg';
import arrowWhite from './../assets/icons/arrow-down-white.svg';

export const tariffsData = [
  {
    id: 1,
    name: 'Стандартный',
    status: 'Выгодно',
    deliveryPoint: 'Пункт выдачи GB',
    statusImg: standart,
    statusWhiteImg: standartActive,
    arrowImg: arrow,
    arrowWhiteImg: arrowWhite,
    locationImg: location,
    locationWhiteImg: hoveredLocation,
  },
  {
    id: 2,
    name: 'Премиум',
    status: 'Быстро',
    deliveryPoint: 'Местный курьер',
    statusImg: premium,
    statusWhiteImg: premiumActive,
    arrowImg: arrow,
    arrowWhiteImg: arrowWhite,
    locationImg: location,
    locationWhiteImg: hoveredLocation,
  },
];

export const addedCost = 4;
