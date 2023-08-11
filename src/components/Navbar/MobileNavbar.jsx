import { NavLink } from 'react-router-dom';
import SvgAlaket from './Icons/SvgAlaket';
import SvgNotification from './Icons/SvgNotification';
import SvgProfile from './Icons/SvgProfile';
import SvgTracking from './Icons/SvgTracking';
import SvgWarehouse from './Icons/SvgWarehouse';

const MobileNavbar = () => {
  return (
    <ul className='md:hidden mobile-navbar fixed flex justify-between items-center h-16 px-4 w-full bottom-0 left-0 bg-white shadow-[0px_4px_120px_0px_rgba(193,_193,_197,_0.15)] z-[9999]'>
      <li>
        <NavLink to='/tracking'>
          <SvgTracking className='mx-auto' />
          <span className='text-[10px] text-colGray font-medium'>Трекинг</span>
        </NavLink>
      </li>
      <li>
        <NavLink to='/warehouses'>
          <SvgWarehouse className='mx-auto' />
          <span className='text-[10px] text-colGray font-medium'>Склады</span>
        </NavLink>
      </li>
      <li>
        <NavLink to='/'>
          <SvgAlaket className='mx-auto' />
          <span className='text-[10px] text-colGray font-medium'>Алакет</span>
        </NavLink>
      </li>
      <li>
        <NavLink to='/profile/notifications'>
          <SvgNotification className='mx-auto' />
          <span className='text-[10px] text-colGray font-medium'>
            Уведомления
          </span>
        </NavLink>
      </li>
      <li>
        <NavLink to='/profile/personal-data'>
          <SvgProfile className='mx-auto' />
          <span className='text-[10px] text-colGray font-medium'>Профиль</span>
        </NavLink>
      </li>
    </ul>
  );
};

export default MobileNavbar;
