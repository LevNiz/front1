import { NavLink } from 'react-router-dom';
import logo from '../../assets/gb-shop/icons/gb-shop-logo.svg';
import facebook from '../../assets/icons/Facebook.svg';
import instagram from '../../assets/icons/Instagram.svg';
import tiktok from '../../assets/icons/tiktok.svg';
import vk from '../../assets/icons/vk.svg';
import telegram from '../../assets/icons/telegram.svg';
import mir from '../../assets/images/mir.svg';
import mastercard from '../../assets/images/mastercard.svg';
import visa from '../../assets/images/visa.svg';
import amex from '../../assets/images/amex.jpeg';
import maestro from '../../assets/images/maestro.svg';
import playMarket from '../../assets/images/play-market.svg';
import appStore from '../../assets/images/appStore2.svg';

const GBShopFooter = () => {
  return (
    <footer
      id='footer'
      className='py-10 pb-12 md:pb-10 bg-[#FBFBFB] text-center mm:text-left'
    >
      <div className='flex-col space-y-10 lg:space-y-0 lg:flex-row flex justify-between ld:items-center w-full container'>
        <NavLink className='lg:pr-5' to='/'>
          <img
            className='w-[64px] lg:w-[106px] mx-auto lg:mx-0'
            src={logo}
            alt='*'
          />
        </NavLink>
        <div className='flex w-full md:w-auto justify-center lg:justify-start mm:flex-row flex-col space-y-7 mm:space-y-0 mm:space-x-12 xl:pr-32'>
          <ul className='space-y-2'>
            <li className='text-xl font-medium mb-3'>Контакты</li>
            <li className='opacity-80 hover:opacity-100 duration-100'>
              +996(550)-666-044
            </li>
            <li className='opacity-80 hover:opacity-100 duration-100'>
              8(800)201-07-88
            </li>
            <li className='opacity-80 hover:opacity-100 duration-100'>
              support@givbox.ru
            </li>
          </ul>
          <ul className='space-y-2'>
            <li className='text-xl font-medium mb-3'>Политика</li>
            <li className='opacity-80 hover:opacity-100 duration-100'>
              <NavLink to='/privacy-policy' target='_blank'>
                Политика конфиденциальности
              </NavLink>
            </li>
            <li className='opacity-80 hover:opacity-100 duration-100'>
              <NavLink to='/user-agreement' target='_blank'>
                Пользовательское соглашение
              </NavLink>
            </li>
            <li className='opacity-80 hover:opacity-100 duration-100'>
              <NavLink to='/refund-policy' target='_blank'>
                Правила возврата денежных средств
              </NavLink>
            </li>
          </ul>
        </div>
        <div className='md:pl-5'>
          <ul className='flex md:justify-start justify-center items-center mt-5 md:mt-0 space-x-3'>
            <li className='bg-colYellow w-[38px] h-[38px] rounded-full flex justify-center items-center'>
              <NavLink
                to='https://www.facebook.com/givboxworld'
                target='_blank'
                className='flex justify-center items-center w-full h-full'
              >
                <img src={facebook} alt='*' />
              </NavLink>
            </li>
            <li className='bg-colYellow w-[38px] h-[38px] rounded-full flex justify-center items-center'>
              <NavLink
                to='https://t.me/givboxworld'
                target='_blank'
                className='flex justify-center items-center w-full h-full'
              >
                <img className='w-[18px]' src={telegram} alt='*' />
              </NavLink>
            </li>
            <li className='bg-colYellow w-[38px] h-[38px] rounded-full flex justify-center items-center'>
              <NavLink
                to='https://www.instagram.com/givboxworld/'
                target='_blank'
                className='flex justify-center items-center w-[18px] h-full'
              >
                <img src={instagram} alt='*' />
              </NavLink>
            </li>
            <li className='bg-colYellow w-[38px] h-[38px] rounded-full flex justify-center items-center'>
              <NavLink
                to='https://vk.com/givboxworld'
                target='_blank'
                className='flex justify-center items-center w-full h-full'
              >
                <img className='w-5' src={vk} alt='*' />
              </NavLink>
            </li>
            <li className='bg-colYellow w-[38px] h-[38px] rounded-full flex justify-center items-center'>
              <NavLink
                to='https://www.tiktok.com/@givboxworld'
                target='_blank'
                className='flex justify-center items-center w-full h-full'
              >
                <img className='w-[15px]' src={tiktok} alt='*' />
              </NavLink>
            </li>
          </ul>
          <div className='flex justify-center md:justify-end items-center pt-8 md:pt-5 space-x-2'>
            <div className='w-[50px] h-[30px] bg-[#4b2592] flex justify-center items-center'>
              <img
                className='w-[40px] object-contain'
                src={mastercard}
                alt='*'
              />
            </div>
            <div className='w-[50px] h-[30px] bg-white flex justify-center items-center'>
              <img className='w-[40px] object-contain' src={visa} alt='*' />
            </div>
            <div className='w-[50px] h-[30px] bg-white flex justify-center items-center'>
              <img className='w-[40px] object-contain' src={mir} alt='*' />
            </div>
            <div className='w-[50px] h-[30px] bg-white flex justify-center items-center'>
              <img className='w-[40px] object-contain' src={maestro} alt='*' />
            </div>
            <div className='w-[50px] h-[30px] bg-[#2b71b3] flex justify-center items-center'>
              <img className='w-[40px] object-contain' src={amex} alt='*' />
            </div>
          </div>
          <p className='text-colBlack pt-7 xl:pt-3 pb-2 text-center xl:text-start'>
            Приложение доступно в:
          </p>
          <div className='flex justify-center items-center xl:justify-start space-x-3'>
            <NavLink
              to='https://play.google.com/store/apps/details?id=kg.kyrgyzcoder.givboxkg'
              target='_blank'
              className='w-[122px] h-[47px]'
            >
              <img src={playMarket} alt='*' />
            </NavLink>
            <NavLink
              to='https://apps.apple.com/kg/app/givbox/id6477327244'
              target='_blank'
              className='w-[122px] h-[47px]'
            >
              <img src={appStore} alt='*' />
            </NavLink>
          </div>
        </div>
      </div>
      <p className='container text-center lg:text-right pt-5 text-[#C3C3C3] text-sm font-medium'>
        © {new Date().getFullYear()}
      </p>
    </footer>
  );
};

export default GBShopFooter;
