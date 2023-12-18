import { NavLink } from 'react-router-dom';
import logo from '../../assets/gb-shop/icons/gb-shop-logo.svg';
import facebook from '../../assets/icons/Facebook.svg';
import instagram from '../../assets/icons/Instagram.svg';
import tiktok from '../../assets/icons/tiktok.svg';
import vk from '../../assets/icons/vk.svg';
import telegram from '../../assets/icons/telegram.svg';

const GBShopFooter = () => {
  return (
    <footer id='footer' className='py-10 pb-12 md:pb-10 bg-[#FBFBFB]'>
      <div className='flex-col space-y-5 lg:space-y-0 lg:flex-row flex justify-between ld:items-center w-full container'>
        <NavLink className='pr-5' to='/'>
          <img className='w-28' src={logo} alt='*' />
        </NavLink>
        <div className='flex md:flex-row flex-col space-y-7 md:space-y-0 md:space-x-12'>
          <ul className='space-y-2'>
            <li className='text-xl font-medium mb-3'>Главная</li>
            <li className='opacity-80 hover:opacity-100 duration-100'>
              <NavLink to='/tracking'>Трекинг посылок</NavLink>
            </li>
            <li className='opacity-80 hover:opacity-100 duration-100'>
              <NavLink to='/depots'>Наши склады</NavLink>
            </li>
          </ul>
          <ul className='space-y-2'>
            <li className='text-xl font-medium mb-3'>Контакты</li>
            <li className='opacity-80 hover:opacity-100 duration-100'>
              Тел: +996 123 456 678
            </li>
            <li className='opacity-80 hover:opacity-100 duration-100'>
              Эл. почта: givbox@givbox.ru
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
        </div>
      </div>
      <p className='container text-right text-[#C3C3C3] text-sm font-medium'>
        © {new Date().getFullYear()}
      </p>
    </footer>
  );
};

export default GBShopFooter;
