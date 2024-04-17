import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/header-logo.svg';
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
import call from '../../assets/icons/call-white.svg';
import mail from '../../assets/icons/gmail-white.svg';
import youtube from '../../assets/icons/YouTube.svg';
import playMarket from '../../assets/images/play-market.svg';
import appStore from '../../assets/images/appStore2.svg';

const Footer = () => {
  return (
    <footer
      id='footer'
      className='bg-black py-10 lg:min-h-[252px] pb-12 md:pb-10'
    >
      <div className='flex-col space-y-5 lg:space-y-0 xl:flex-row flex justify-between w-full container'>
        <NavLink className='pr-5' to='/'>
          <img
            className='w-28 sm:w-32 min-w-[112px] sm:min-w-[128px]'
            src={logo}
            alt='*'
          />
        </NavLink>
        <div className='flex justify-between xl:justify-start pt-5 xl:pt-0 md:flex-row flex-col space-y-7 md:space-y-0 text-white md:space-x-12'>
          <ul className='space-y-2'>
            <li className='text-xl font-medium mb-3'>Контакты</li>
            <li className='opacity-80 hover:opacity-100 duration-100 flex items-center'>
              <img className='mr-2 w-5' src={call} alt='*' />
              <NavLink className='whitespace-nowrap' to='tel:8(800)201-07-88'>
                8(800)201-07-88
              </NavLink>
            </li>
            <li className='opacity-80 hover:opacity-100 duration-100 flex items-center'>
              <img className='mr-2 w-5' src={mail} alt='*' />
              <NavLink to='#'>support@givbox.ru</NavLink>
            </li>
          </ul>
          <ul className='space-y-3 max-w-[280px]'>
            <li className='text-xl font-medium mb-3'>Адреса ПВЗ</li>
            <li>
              <p>Россия, Москва</p>
              <p className='opacity-80 text-sm'>
                121087, мун. округ Филевский парк, ТЦ Горбушка, Барклая ул. д.
                8. оф 457
              </p>
            </li>
            <li>
              <p>Россия, Самара</p>
              <p className='opacity-80 text-sm'>
                443110, Ново- Садовая улица, д. 30.
              </p>
            </li>
            <li>
              <p>Кыргызстан, Бишкек</p>
              <p className='opacity-80 text-sm'>720021, ул. Шопоково, д. 33.</p>
            </li>
          </ul>
          <ul className='space-y-2'>
            <li className='text-xl font-medium mb-3'>Политика</li>
            <li className='opacity-80 hover:opacity-100 duration-100'>
              <NavLink
                to='https://givbox.ru/givbox/media/files/%D0%9F%D0%BE%D0%BB%D0%B8%D1%82%D0%B8%D0%BA%D0%B0_%D0%BA%D0%BE%D0%BD%D1%84%D0%B8%D0%B4%D0%B8%D1%86%D0%B8%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D1%81%D1%82%D0%B8_16.04.2024.pdf'
                target='_blank'
              >
                Политика конфиденциальности
              </NavLink>
            </li>
            <li className='opacity-80 hover:opacity-100 duration-100'>
              <NavLink
                to='https://givbox.ru/givbox/media/files/%D0%9F%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D1%81%D0%BA%D0%BE%D0%B5_%D1%81%D0%BE%D0%B3%D0%BB%D0%B0%D1%88%D0%B5%D0%BD%D0%B8%D0%B5_16.04.2024.pdf'
                target='_blank'
              >
                Пользовательское соглашение
              </NavLink>
            </li>
            <li className='opacity-80 hover:opacity-100 duration-100'>
              <NavLink
                to='https://givbox.ru/givbox/media/files/%D0%94%D0%BE%D0%B3%D0%BE%D0%B2%D0%BE%D1%80_%D0%BE%D1%84%D0%B5%D1%80%D1%82%D0%B0.pdf'
                target='_blank'
              >
                Публичная оферта
              </NavLink>
            </li>
            <li className='opacity-80 hover:opacity-100 duration-100'>
              <NavLink
                to='https://givbox.ru/givbox/media/files/%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA_%D0%B7%D0%B0%D0%BF%D1%80%D0%B5%D1%89%D0%B5%D0%BD%D0%BD%D1%8B%D1%85_%D1%82%D0%BE%D0%B2%D0%B0%D1%80%D0%BE%D0%B2.pdf'
                target='_blank'
              >
                Запрещенные товары
              </NavLink>
            </li>
            <li className='opacity-80 hover:opacity-100 duration-100'>
              <NavLink
                to='https://givbox.ru/givbox/media/files/%D0%9F%D1%80%D0%B0%D0%B2%D0%B8%D0%BB%D0%B0_%D0%B4%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D0%BA%D0%B8.pdf'
                target='_blank'
              >
                Правила условия доставки
              </NavLink>
            </li>
            <li className='opacity-80 hover:opacity-100 duration-100'>
              <NavLink
                to='https://givbox.ru/givbox/media/files/%D0%9F%D1%80%D0%B0%D0%B2%D0%B8%D0%BB%D0%B0_%D0%BE%D0%BF%D0%BB%D0%B0%D1%82%D1%8B_%D0%B8_%D0%B2%D0%BE%D0%B7%D0%B2%D1%80%D0%B0%D1%82%D0%B0_%D0%B4%D0%B5%D0%BD%D0%B5%D0%B6%D0%BD%D1%8B%D1%85_%D1%81%D1%80%D0%B5%D0%B4%D1%81%D1%82%D0%B2.pdf'
                target='_blank'
              >
                Правила оплаты и возврата денежных средств
              </NavLink>
            </li>
          </ul>
        </div>
        <div className='md:pl-5 pt-8 xl:pt-0'>
          <ul className='flex justify-center xl:justify-end items-center mt-5 md:mt-0 space-x-3'>
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
                <img className='w-[18px]' src={instagram} alt='*' />
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
            <li className='bg-colYellow w-[38px] h-[38px] rounded-full flex justify-center items-center'>
              <NavLink
                to='https://www.youtube.com/@GivBoxWorld'
                target='_blank'
                className='flex justify-center items-center w-full h-full'
              >
                <img className='w-5' src={youtube} alt='*' />
              </NavLink>
            </li>
          </ul>
          <div className='flex justify-center xl:justify-end items-center pt-10 md:pt-8 space-x-2'>
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
          <p className='text-white pt-7 xl:pt-3 pb-2 text-center xl:text-start'>
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
    </footer>
  );
};

export default Footer;
