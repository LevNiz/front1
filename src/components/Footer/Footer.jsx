import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/header-logo.svg';
import facebook from '../../assets/icons/Facebook.svg';
import instagram from '../../assets/icons/Instagram.svg';
import tiktok from '../../assets/icons/tiktok.svg';
import vk from '../../assets/icons/vk.svg';
import mir from '../../assets/images/mir.svg';
import mastercard from '../../assets/images/mastercard.svg';
import visa from '../../assets/images/visa.svg';
import amex from '../../assets/images/amex.jpeg';
import maestro from '../../assets/images/maestro.svg';
import telegram from '../../assets/icons/telegram.svg';

const Footer = () => {
  return (
    <footer className='bg-black py-10 lg:py-0 lg:min-h-[252px] flex justify-between items-center pb-12 md:pb-10'>
      <div className='flex-col space-y-5 lg:space-y-0 lg:flex-row flex justify-between w-full container'>
        <NavLink className='pr-5' to='/'>
          <img src={logo} alt='*' />
        </NavLink>
        <div className='flex md:flex-row flex-col space-y-7 md:space-y-0 text-white md:space-x-12'>
          <ul className='space-y-2'>
            <li className='text-xl font-medium mb-3'>Главная</li>
            <li>
              <NavLink
                to='tracking'
                className='text-base hover:text-colYellow duration-100'
              >
                Трекинг посылок
              </NavLink>
            </li>
            <li>
              <NavLink
                to='depots'
                className='text-base hover:text-colYellow duration-100'
              >
                Наши склады
              </NavLink>
            </li>
            <li>
              <NavLink
                to='gb-buyer'
                className='text-base hover:text-colYellow duration-100'
              >
                GB-Байер
              </NavLink>
            </li>
            <li>
              <NavLink
                to='gb-business'
                className='text-base hover:text-colYellow duration-100'
              >
                GB-Бизнес
              </NavLink>
            </li>
          </ul>
          <ul className='space-y-2'>
            <li className='text-xl font-medium mb-3'>Контакты</li>
            <li>
              <NavLink
                to='tel:+996 123 456 678'
                className='text-base hover:text-colYellow duration-100'
              >
                Тел: +996 123 456 678
              </NavLink>
            </li>
            <li>
              <NavLink
                to='#'
                className='text-base hover:text-colYellow duration-100'
              >
                Эл. почта: givbox@gmail.com
              </NavLink>
            </li>
          </ul>
          <ul className='space-y-2'>
            <li className='text-xl font-medium mb-3'>Политика</li>
            <li>
              <NavLink
                to='/privacy-policy'
                target='_blank'
                className='text-base hover:text-colYellow duration-100'
              >
                Политика конфиденциальности
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/user-agreement'
                target='_blank'
                className='text-base hover:text-colYellow duration-100'
              >
                Пользовательское соглашение
              </NavLink>
            </li>
          </ul>
        </div>
        <div>
          <ul className='flex md:justify-end justify-center items-center mt-5 md:mt-0 space-x-3'>
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
                className='flex justify-center items-center w-full h-full'
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
          <div className='flex justify-center md:justify-end items-center pt-10 md:pt-5 space-x-2'>
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
        </div>
      </div>
    </footer>
  );
};

export default Footer;
