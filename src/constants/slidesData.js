import slideImg2 from './../assets/images/slider/bg2-min.jpg';
import slideImg3 from './../assets/images/slider/bg3-min.jpg';
import slideImg4 from './../assets/images/slider/bg4-min.jpg';
import slideImg5 from './../assets/images/slider/bg5-min.jpg';
import slideImg6 from './../assets/images/slider/bg6-min.jpg';
import slideImg7 from './../assets/images/slider/bg7-min.jpg';
import extraImg1 from './../assets/images/slider/extra-img1.svg';
import extraImg2 from './../assets/images/slider/extra-img2.svg';
import extraImg3 from './../assets/images/slider/extra-img3.svg';
import extraImg4 from './../assets/images/slider/extra-img4.svg';
import extraImg5 from './../assets/images/slider/extra-img5.svg';
import extraImg6 from './../assets/images/slider/extra-img6.svg';
import extraImg7 from './../assets/images/slider/extra-img7.svg';
import arrow1 from './../assets/images/slider/slider-arrows1.svg';
import arrow2 from './../assets/images/slider/slider-arrows2.svg';

export const slidesData = [
  {
    id: 1,
    backgroundImage: `url(${slideImg5}`,
    title: 'GB-Business',
    description: 'Cервис для доставок международных коммерческих грузов',
    descStyle: 'max-w-[440px]',
    extraImg: extraImg1,
    arrowImg: arrow1,
  },
  {
    id: 2,
    backgroundImage: `url(${slideImg2}`,
    title: 'GB-Shop',
    description: 'Cервис по продаже брендовых товаров',
    extraImg: extraImg2,
    arrowImg: arrow1,
  },
  {
    id: 3,
    backgroundImage: `url(${slideImg3}`,
    title: 'GB-Franchise ',
    description: 'Cервис по предоставлению франшизы',
    extraImg: extraImg3,
    arrowImg: arrow1,
  },
  {
    id: 4,
    backgroundImage: `url(${slideImg4}`,
    title: 'GB-Alaket',
    description: 'сервис по поиску для отправок посылок по пути',
    descStyle: 'max-w-[463px]',
    extraImg: extraImg4,
    arrowImg: arrow2,
    textStyle: 'text-black',
  },
  {
    id: 5,
    backgroundImage: `url(${slideImg5}`,
    title: 'GB-Buyer',
    description:
      'сервис по оказанию услуг по выкупу товаров в зарубежных магазинах и маркетплейсах',
    descStyle: 'max-w-[516px]',
    extraImg: extraImg5,
    arrowImg: arrow1,
  },
  {
    id: 6,
    backgroundImage: `url(${slideImg6}`,
    title: 'GB-Chat',
    description:
      'Cервис для общения клиентов, продавцов, поставщиков, покупателей и людей желающих найти друг друга для передачи посылок по пути',
    descStyle: 'max-w-[703px]',
    extraImg: extraImg6,
    arrowImg: arrow1,
  },
  {
    id: 7,
    backgroundImage: `url(${slideImg7}`,
    title: 'GB-Coin',
    description:
      'Cервис для оплаты товаров, услуг и переводов денег по всему миру',
    descStyle: 'max-w-[572px]',
    extraImg: extraImg7,
    arrowImg: arrow1,
    buttonStyle: 'text-black bg-colYellow',
  },
];
