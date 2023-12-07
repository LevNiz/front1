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
    <footer
      id='footer'
      className='bg-black py-10 lg:min-h-[252px] flex justify-between items-center pb-12 md:pb-10'
    >
      <div className='flex-col space-y-5 lg:space-y-0 lg:flex-row flex justify-between w-full container'>
        <NavLink className='pr-5' to='/'>
          <img src={logo} alt='*' />
        </NavLink>
        <div className='flex md:flex-row flex-col space-y-7 md:space-y-0 text-white md:space-x-12'>
          <ul className='space-y-2'>
            <li className='text-xl font-medium mb-3'>Контакты</li>
            <li className='opacity-80 hover:opacity-100 duration-100'>
              <NavLink to='tel:8(800)201-07-88'>8(800)201-07-88</NavLink>
            </li>
            <li className='opacity-80 hover:opacity-100 duration-100'>
              <NavLink to='#'>support@givbox.ru</NavLink>
            </li>
          </ul>
          <ul className='space-y-3 max-w-[280px]'>
            <li className='text-xl font-medium mb-3'>Адреса ПВЗ</li>
            <li className='opacity-80'>
              121087, Россия, Москва, Багратионовский проезд, д. 5, этаж 3, офис
              34.
            </li>
            <li className='opacity-80'>
              443110, Россия, Самара, Ново- Садовая улица, д. 30.
            </li>
            <li className='opacity-80'>
              724831, Кыргызстан, Бишкек, ул. Шопоково, д. 33.
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
