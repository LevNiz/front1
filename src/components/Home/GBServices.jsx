import bgImg from '../../assets/images/services-bg.jpg';
import gbShop from '../../assets/icons/gb-services/gb-shop.svg';
import gbPay from '../../assets/icons/gb-services/gb-pay.svg';
import gbBusiness from '../../assets/icons/gb-services/gb-business.svg';
import gbFranchise from '../../assets/icons/gb-services/gb-franchise.svg';
import gbBuyer from '../../assets/icons/gb-services/gb-buyer.svg';
import alaket from '../../assets/icons/gb-services/gb-alaket.svg';
import gbChat from '../../assets/icons/gb-services/gb-chat.svg';
import { NavLink } from 'react-router-dom';

const GBServices = () => {
  return (
    <div className='content'>
      <div
        style={{ backgroundImage: `url(${bgImg})` }}
        className='grid grid-cols-2 lg:grid-cols-4 text-white'
      >
        <div className='min-h-[160px] ss:min-h-[180px] sm:min-h-[224px] flex justify-center items-center'>
          <h3 className='font-bold text-2xl sm:text-4xl text-center'>
            Наши <br />
            сервисы
          </h3>
        </div>
        <NavLink
          to='/gb-shop'
          target='_blank'
          className='relative group min-h-[160px] ss:min-h-[180px] sm:min-h-[224px] flex justify-center items-center bg-orange'
        >
          <div className='min-h-[140px] mm:min-h-[auto]'>
            <img className='mx-auto w-10 sm:w-auto' src={gbShop} alt='*' />
            <h3 className='font-medium sm:font-bold text-xl sm:text-2xl lg:text-3xl text-center mt-2'>
              GB-Shop
            </h3>
            <p className='lg:hidden text-center p-2 text-[#FBFBFB] opacity-80 text-xs sm:text-sm'>
              Магазин брендовых товаров со всего мира
            </p>
          </div>
          <div className='hidden lg:flex group-hover:opacity-[1] opacity-0 duration-200 absolute top-0 left-0 w-full h-full justify-center items-center bg-[linear-gradient(180deg,_rgba(2,_1,_5,_0.58)_0%,_#020105_100%)]'>
            <p className='text-center p-2 text-[#FBFBFB] mm:text-lg'>
              Магазин брендовых товаров со всего мира
            </p>
          </div>
        </NavLink>
        <NavLink
          to='/gb-business'
          className='relative group min-h-[160px] ss:min-h-[180px] sm:min-h-[224px] flex justify-center items-center bg-business lg:bg-transparent'
        >
          <div className='min-h-[140px] mm:min-h-[auto]'>
            <img className='mx-auto w-10 sm:w-auto' src={gbBusiness} alt='*' />
            <h3 className='font-medium sm:font-bold text-xl sm:text-2xl lg:text-3xl text-center mt-2'>
              GB-Business
            </h3>
            <p className='lg:hidden text-center p-2 text-[#FBFBFB] opacity-80 text-xs sm:text-sm'>
              Сервис по логистике международных коммерческих грузов
            </p>
          </div>
          <div className='hidden lg:flex group-hover:opacity-[1] opacity-0 duration-200 absolute top-0 left-0 w-full h-full justify-center items-center bg-[linear-gradient(180deg,_rgba(2,_1,_5,_0.58)_0%,_#020105_100%)]'>
            <p className='text-center p-2 text-[#FBFBFB] mm:text-lg'>
              Сервис по логистике международных коммерческих грузов
            </p>
          </div>
        </NavLink>
        <NavLink
          to='/gb-franchise'
          className='relative group min-h-[160px] ss:min-h-[180px] sm:min-h-[224px] flex justify-center items-center bg-franchise'
        >
          <div className='min-h-[140px] mm:min-h-[auto]'>
            <img className='mx-auto w-10 sm:w-auto' src={gbFranchise} alt='*' />
            <h3 className='font-medium sm:font-bold text-xl sm:text-2xl lg:text-3xl text-center mt-2'>
              GB-Franchise
            </h3>
            <p className='lg:hidden text-center p-2 text-[#FBFBFB] opacity-80 text-xs sm:text-sm'>
              Сервис по предоставлению франшизы в Вашем городе
            </p>
          </div>
          <div className='hidden lg:flex group-hover:opacity-[1] opacity-0 duration-200 absolute top-0 left-0 w-full h-full justify-center items-center bg-[linear-gradient(180deg,_rgba(2,_1,_5,_0.58)_0%,_#020105_100%)]'>
            <p className='text-center p-2 text-[#FBFBFB] mm:text-lg'>
              Сервис по предоставлению франшизы в Вашем городе
            </p>
          </div>
        </NavLink>
        <NavLink
          to='#'
          onClick={() => alert('В процессе разработки!')}
          className='relative group min-h-[160px] ss:min-h-[180px] sm:min-h-[224px] flex justify-center items-center bg-pay'
        >
          <div className='min-h-[140px] mm:min-h-[auto]'>
            <img className='mx-auto w-10 sm:w-auto' src={gbPay} alt='*' />
            <h3 className='font-medium sm:font-bold text-xl sm:text-2xl lg:text-3xl text-center mt-2'>
              GB-Pay
            </h3>
            <p className='lg:hidden text-center p-2 text-[#FBFBFB] opacity-80 text-xs sm:text-sm'>
              Сервис для оплаты услуг, товаров и переводов денег внутри
              экосистемы GivBox
            </p>
          </div>
          <div className='hidden lg:flex group-hover:opacity-[1] opacity-0 duration-200 absolute top-0 left-0 w-full h-full justify-center items-center bg-[linear-gradient(180deg,_rgba(2,_1,_5,_0.58)_0%,_#020105_100%)]'>
            <p className='text-center p-2 text-[#FBFBFB] mm:text-lg'>
              Сервис для оплаты услуг, товаров и переводов денег внутри
              экосистемы GivBox
            </p>
          </div>
        </NavLink>
        <NavLink
          to='/gb-buyer'
          className='relative group min-h-[160px] ss:min-h-[180px] sm:min-h-[224px] flex justify-center items-center bg-buyer lg:bg-transparent'
        >
          <div className='min-h-[140px] mm:min-h-[auto]'>
            <img className='mx-auto w-10 sm:w-auto' src={gbBuyer} alt='*' />
            <h3 className='font-medium sm:font-bold text-xl sm:text-2xl lg:text-3xl text-center mt-2'>
              GB-Buyer
            </h3>
            <p className='lg:hidden text-center p-2 text-[#FBFBFB] opacity-80 text-xs sm:text-sm'>
              Сервис для оказания услуг выкупа по всему миру
            </p>
          </div>
          <div className='hidden lg:flex group-hover:opacity-[1] opacity-0 duration-200 absolute top-0 left-0 w-full h-full justify-center items-center bg-[linear-gradient(180deg,_rgba(2,_1,_5,_0.58)_0%,_#020105_100%)]'>
            <p className='text-center p-2 text-[#FBFBFB] mm:text-lg'>
              Сервис для оказания услуг выкупа по всему миру
            </p>
          </div>
        </NavLink>
        <NavLink
          to='/alaket'
          className='relative group min-h-[160px] ss:min-h-[180px] sm:min-h-[224px] flex justify-center items-center bg-alaket'
        >
          <div className='min-h-[140px] mm:min-h-[auto]'>
            <img className='mx-auto w-10 sm:w-auto' src={alaket} alt='*' />
            <h3 className='font-medium sm:font-bold text-xl sm:text-2xl lg:text-3xl text-center mt-2'>
              GB-Alaket
            </h3>
            <p className='lg:hidden text-center p-2 text-[#FBFBFB] opacity-80 text-xs sm:text-sm'>
              Сервис по поиску людей для передачи посылок по пути
            </p>
          </div>
          <div className='hidden lg:flex group-hover:opacity-[1] opacity-0 duration-200 absolute top-0 left-0 w-full h-full justify-center items-center bg-[linear-gradient(180deg,_rgba(2,_1,_5,_0.58)_0%,_#020105_100%)]'>
            <p className='text-center p-2 text-[#FBFBFB] mm:text-lg'>
              Сервис по поиску людей для передачи посылок по пути
            </p>
          </div>
        </NavLink>
        <NavLink
          to='/gb-chat'
          className='relative group min-h-[160px] ss:min-h-[180px] sm:min-h-[224px] flex justify-center items-center'
        >
          <div className='min-h-[140px] mm:min-h-[auto]'>
            <img className='mx-auto w-10 sm:w-auto' src={gbChat} alt='*' />
            <h3 className='font-medium sm:font-bold text-xl sm:text-2xl lg:text-3xl text-center mt-2'>
              GB-Chat
            </h3>
            <p className='lg:hidden text-center p-2 text-[#FBFBFB] opacity-80 text-xs sm:text-sm'>
              Удобный месседжер для общения внутри экосистемы GivBox
            </p>
          </div>
          <div className='hidden lg:flex group-hover:opacity-[1] opacity-0 duration-200 absolute top-0 left-0 w-full h-full justify-center items-center bg-[linear-gradient(180deg,_rgba(2,_1,_5,_0.58)_0%,_#020105_100%)]'>
            <p className='text-center p-2 text-[#FBFBFB] mm:text-lg'>
              Удобный мессенджер для общения внутри экосистемы GivBox
            </p>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default GBServices;
