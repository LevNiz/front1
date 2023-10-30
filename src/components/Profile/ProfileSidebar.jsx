import { NavLink, useNavigate } from 'react-router-dom';
import logout from './../../assets/icons/logout.svg';
import profile from './../../assets/icons/new-profile.svg';
import parcel from './../../assets/icons/my-parcel.svg';
import wallet from './../../assets/icons/wallet.svg';
import notification from './../../assets/icons/notification2.svg';
import location from './../../assets/icons/new-location.svg';
import time from './../../assets/icons/timeSvg.svg';
import chat from './../../assets/icons/chat.svg';
import gbChat from './../../assets/icons/gb-chat.svg';
import { logOutFetch } from '../../api/user';
import { useDispatch } from 'react-redux';
import Modal from '../../helpers/Modals/Modal';
import { useState } from 'react';

const ProfileSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState();

  const closeModal = () => {
    setModalOpen(false);
  };

  const logOutUser = async () => {
    await logOutFetch(dispatch);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/');
  };

  return (
    <>
      <div className='bg-white z-[99999] md:min-w-[240px] md:max-w-[240px] lg:min-w-[300px] lg:max-w-[300px] w-full hidden md:block'>
        <ul className='border-r border-colGray2 pb-24 pt-6 sidebar pr-5 lg:pr-10 hidden md:block'>
          <li className='mb-6'>
            <NavLink
              to='personal-data'
              className='text-xl flex items-center p-2 rounded-lg'
            >
              <img className='pr-3' src={profile} alt='*' />
              <span>Личные данные</span>
            </NavLink>
          </li>
          <li className='my-6'>
            <NavLink
              to='my-parcels'
              className='text-xl flex items-center p-2 rounded-lg'
            >
              <img className='pr-3' src={parcel} alt='*' />
              <span>Мои посылки</span>
            </NavLink>
          </li>
          <li className='my-6'>
            <NavLink
              to='my-applications'
              className='text-xl flex items-center p-2 rounded-lg'
            >
              <img className='pr-3' src={time} alt='*' />
              <span>Мои заявки</span>
            </NavLink>
          </li>
          <li className='my-6'>
            <NavLink
              to='gb-chat'
              className='text-xl flex items-center p-2 rounded-lg'
            >
              <img className='pr-3' src={gbChat} alt='*' />
              <span>GB-Чат</span>
            </NavLink>
          </li>
          <li className='my-6'>
            <NavLink
              to='tech-chat'
              className='text-xl flex items-center p-2 rounded-lg'
            >
              <img className='pr-3' src={chat} alt='*' />
              <span>Чат с поддержкой</span>
            </NavLink>
          </li>
          <li className='my-6'>
            <NavLink
              to='notifications'
              className='text-xl flex items-center p-2 rounded-lg'
            >
              <img className='pr-3' src={notification} alt='*' />
              <span>Уведомления</span>
            </NavLink>
          </li>
          <li className='my-6'>
            <NavLink
              to='my-wallet'
              className='text-xl flex items-center p-2 rounded-lg'
            >
              <img className='pr-3' src={wallet} alt='*' />
              <span>Мой кошелёк</span>
            </NavLink>
          </li>
          <li className='my-6'>
            <NavLink
              to='saved-addresses'
              className='text-xl flex items-center p-2 rounded-lg'
            >
              <img className='pr-3' src={location} alt='*' />
              <span>Сохранённые адреса</span>
            </NavLink>
          </li>
          <li className='mt-10'>
            <button
              onClick={() => {
                setModalOpen(true);
                setModalContent('logout');
              }}
              className='text-xl flex items-center p-2 rounded-lg'
            >
              <img className='pr-3' src={logout} alt='*' />
              <span>Выйти</span>
            </button>
          </li>
        </ul>
        <Modal
          isOpen={modalOpen}
          onClose={closeModal}
          content={modalContent}
          logOutUser={logOutUser}
        />
      </div>
    </>
  );
};

export default ProfileSidebar;
