import { NavLink } from 'react-router-dom';
import logo from './../../assets/icons/logo.svg';
import facebook from './../../assets/icons/Facebook.svg';
import instagram from './../../assets/icons/Instagram.svg';
import whatsapp from './../../assets/icons/Whatsapp.svg';
import youtube from './../../assets/icons/Youtube.svg';

const Footer = () => {
  return (
    <footer className='bg-black min-h-[252px] flex justify-between items-center'>
      <div className='flex justify-between items-center w-full container'>
        <NavLink to='/'>
          <img src={logo} alt='*' />
        </NavLink>
        <div className='flex text-white space-x-12'>
          <ul className='space-y-2'>
            <li className='text-xl font-medium mb-3'>Главная</li>
            <li>
              <NavLink to='tracking' className='text-base hover:text-colYellow duration-100'>Трекинг посылок</NavLink>
            </li>
            <li>
              <NavLink to='warehouses' className='text-base hover:text-colYellow duration-100'>Наши склады</NavLink>
            </li>
          </ul>
          <ul className='space-y-2'>
            <li className='text-xl font-medium mb-3'>Контакты</li>
            <li>
              <NavLink to='tel:+996 123 456 678' className='text-base hover:text-colYellow duration-100'>Тел: +996 123 456 678</NavLink>
            </li>
            <li>
              <NavLink to='#' className='text-base hover:text-colYellow duration-100'>Эл. почта: givbox@gmail.com</NavLink>
            </li>
          </ul>
          <ul className='space-y-2'>
            <li className='text-xl font-medium mb-3'>Политика</li>
            <li>
              <NavLink to='#' className='text-base hover:text-colYellow duration-100'>Политика конфиденциальности </NavLink>
            </li>
            <li>
              <NavLink to='#' className='text-base hover:text-colYellow duration-100'>Сведения об авторских правах</NavLink>
            </li>
            <li>
              <NavLink to='#' className='text-base hover:text-colYellow duration-100'>Политика согласия</NavLink>
            </li>
          </ul>
        </div>
        <div>
          <ul className='flex justify-end items-center space-x-3'>
            <li className='bg-colYellow w-[38px] h-[38px] rounded-full flex justify-center items-center'>
              <NavLink to='#' className='flex justify-center items-center w-full h-full'>
                <img src={facebook} alt='*' />
              </NavLink>
            </li>
            <li className='bg-colYellow w-[38px] h-[38px] rounded-full flex justify-center items-center'>
              <NavLink to='#' className='flex justify-center items-center w-full h-full'>
                <img src={instagram} alt='*' />
              </NavLink>
            </li>
            <li className='bg-colYellow w-[38px] h-[38px] rounded-full flex justify-center items-center'>
              <NavLink to='#' className='flex justify-center items-center w-full h-full'>
                <img src={youtube} alt='*' />
              </NavLink>
            </li>
            <li className='bg-colYellow w-[38px] h-[38px] rounded-full flex justify-center items-center'>
              <NavLink to='#' className='flex justify-center items-center w-full h-full'>
                <img src={whatsapp} alt='*' />
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
