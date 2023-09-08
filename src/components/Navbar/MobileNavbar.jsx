import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import SvgAlaket from './Icons/SvgAlaket';
import SvgNotification from './Icons/SvgNotification';
import SvgProfile from './Icons/SvgProfile';
import SvgTracking from './Icons/SvgTracking';
import SvgDepot from './Icons/SvgDepot';
import SvgHome from './Icons/SvgHome';

const MobileNavbar = () => {
  const user = useSelector((state) => state?.user?.user);

  return (
    <ul className='md:hidden mobile-navbar pt-1 fixed flex justify-between items-center h-16 px-4 w-full bottom-0 left-0 bg-white shadow-[0_3px_12px_rgb(0,0,0,0.2)] z-[9999]'>
      <li className='home'>
        <NavLink to='/'>
          <SvgHome className='mx-auto' />
          <span className='text-[8px] ss:text-[10px] text-colGray'>
            Главная
          </span>
        </NavLink>
      </li>
      <li>
        <NavLink to='/tracking'>
          <SvgTracking className='mx-auto' />
          <span className='text-[8px] ss:text-[10px] text-colGray'>
            Трекинг
          </span>
        </NavLink>
      </li>
      <li>
        <NavLink to='/depots'>
          <SvgDepot className='mx-auto' />
          <span className='text-[8px] ss:text-[10px] text-colGray'>Склады</span>
        </NavLink>
      </li>
      <li>
        <NavLink to='/alaket'>
          <SvgAlaket className='mx-auto' />
          <span className='text-[8px] ss:text-[10px] text-colGray'>Алакет</span>
        </NavLink>
      </li>
      <li>
        <NavLink to='/profile/notifications'>
          <SvgNotification className='mx-auto' />
          <span className='text-[8px] ss:text-[10px] text-colGray'>
            Уведомления
          </span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`${user !== null ? '/profile/personal-data' : '/auth/sign-in'}`}
        >
          <SvgProfile className='mx-auto' />
          <span className='text-[8px] ss:text-[10px] text-colGray'>
            Профиль
          </span>
        </NavLink>
      </li>
    </ul>
  );
};

export default MobileNavbar;
