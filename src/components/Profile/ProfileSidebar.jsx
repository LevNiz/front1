import { NavLink } from 'react-router-dom';
import logout from './../../assets/icons/logout.svg';
import profile from './../../assets/icons/profile2.svg';
import parcel from './../../assets/icons/my-parcel.svg';
import notification from './../../assets/icons/notification2.svg';

const ProfileSidebar = () => {
  return (
    <div className='max-w-[300px] w-full'>
      <ul className='border-r border-colGray2 pb-24 pt-6 sidebar pr-10'>
        <li className='mb-10'>
          <NavLink to='personal-data' className='text-xl flex items-center p-2 rounded-lg'>
            <img className='pr-3' src={profile} alt='*' />
            Личные данные
          </NavLink>
        </li>
        <li className='my-10'>
          <NavLink to='my-parcels' className='text-xl flex items-center p-2 rounded-lg'>
            <img className='pr-3' src={parcel} alt='*' />
            Мои посылки
          </NavLink>
        </li>
        <li className='my-10'>
          <NavLink to='notifications' className='text-xl flex items-center p-2 rounded-lg'>
            <img className='pr-3' src={notification} alt='*' />
            Уведомления
          </NavLink>
        </li>
        <li className='mt-24'>
          <NavLink to='logout' className='text-xl flex items-center p-2 rounded-lg'>
            <img className='pr-3' src={logout} alt='*' />
            Выйти
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default ProfileSidebar;
