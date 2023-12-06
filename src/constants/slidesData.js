import desktopImageBusiness from './../assets/images/slider/gb-business.jpg';
import desktopImageShop from './../assets/images/slider/gb-shop.png';
import desktopImageFranchise from './../assets/images/slider/gb-franchise.png';
import desktopImageBuyer from './../assets/images/slider/gb-buyer.png';
import desktopImagePay from './../assets/images/slider/gb-pay.png';
import desktopImageChat from './../assets/images/slider/gb-chat.png';
import desktopImageAlaket from './../assets/images/slider/gb-alaket.png';

import tabletGBAlaket from './../assets/images/slider/tablet/gb-alaket.png';
import tabletGBBuyer from './../assets/images/slider/tablet/gb-buyer.png';
import tabletGBChat from './../assets/images/slider/tablet/gb-chat.png';
import tabletGBPay from './../assets/images/slider/tablet/gb-pay.png';
import tabletGBFranchise from './../assets/images/slider/tablet/gb-franchise.png';
import tabletGBShop from './../assets/images/slider/tablet/gb-shop.png';

import mobileGBAlaket from './../assets/images/slider/mobile/gb-alaket.png';
import mobileGBBuyer from './../assets/images/slider/mobile/gb-buyer.png';
import mobileGBChat from './../assets/images/slider/mobile/gb-chat.png';
import mobileGBPay from './../assets/images/slider/mobile/gb-pay.png';
import mobileGBFranchise from './../assets/images/slider/mobile/gb-franchise.png';
import mobileGBShop from './../assets/images/slider/mobile/gb-shop.png';

export const slidesData = [
  {
    id: 1,
    backgroundImage: `${desktopImageBusiness}`,
    title: 'GB-Business',
    description: 'Cервис для доставок международных коммерческих грузов',
  },
  {
    id: 2,
    backgroundImage: `${desktopImageShop}`,
    tabletImage: `${tabletGBShop}`,
    mobileImage: `${mobileGBShop}`,
    title: 'GB-Shop',
    description: 'Cервис по продаже брендовых товаров',
  },
  {
    id: 3,
    backgroundImage: `${desktopImageFranchise}`,
    tabletImage: `${tabletGBFranchise}`,
    mobileImage: `${mobileGBFranchise}`,
    title: 'GB-Franchise ',
    description: 'Cервис по предоставлению франшизы',
  },
  {
    id: 4,
    backgroundImage: `${desktopImageBuyer}`,
    tabletImage: `${tabletGBBuyer}`,
    mobileImage: `${mobileGBBuyer}`,
    title: 'GB-Buyer',
    description:
      'Cервис по оказанию услуг по выкупу товаров в зарубежных магазинах и маркетплейсах',
  },
  {
    id: 5,
    backgroundImage: `${desktopImagePay}`,
    tabletImage: `${tabletGBPay}`,
    mobileImage: `${mobileGBPay}`,
    title: 'GB-Pay',
    description:
      'Cервис для оплаты товаров, услуг, и переводов денег по всему миру',
  },
  {
    id: 6,
    backgroundImage: `${desktopImageChat}`,
    tabletImage: `${tabletGBChat}`,
    mobileImage: `${mobileGBChat}`,
    title: 'GB-Chat',
    description:
      'Cервис для общения клиентов, продавцов, поставщиков, покупателей и людей желающих найти друг друга для передачи посылок по пути',
  },
  {
    id: 7,
    backgroundImage: `${desktopImageAlaket}`,
    tabletImage: `${tabletGBAlaket}`,
    mobileImage: `${mobileGBAlaket}`,
    title: 'GB-Alaket',
    description: 'Cервис по поиску для отправок посылок по пути',
  },
];
