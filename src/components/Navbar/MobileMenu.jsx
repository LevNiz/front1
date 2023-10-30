import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logOutFetch } from '../../api/user';
import Modal from '../../helpers/Modals/Modal';

import logout from './../../assets/icons/logout.svg';
import logo from './../../assets/icons/logo-mob.svg';
import arrow from './../../assets/icons/arrow.svg';
import home from './../../assets/icons/mobile-menu/home.svg';
import depot from './../../assets/icons/mobile-menu/depot.svg';
import userIcon from './../../assets/icons/mobile-menu/user.svg';
import buyer from './../../assets/icons/mobile-menu/buyer.svg';
import bussines from './../../assets/icons/mobile-menu/bussines.svg';
import box from './../../assets/icons/mobile-menu/box.svg';
import profileUser from './../../assets/icons/mobile-menu/profile-user.svg';
import profileBox from './../../assets/icons/mobile-menu/profile-box.svg';
import profileNotif from './../../assets/icons/mobile-menu/profile-notification.svg';
import profileWallet from './../../assets/icons/mobile-menu/profile-wallet.svg';
import sendBox from './../../assets/icons/mobile-menu/send-box.svg';
import location from './../../assets/icons/new-location.svg';
import time from './../../assets/icons/timeSvg.svg';
import chat from './../../assets/icons/chat.svg';
import gbChat from './../../assets/icons/gb-chat.svg';

const MobileMenu = ({ isOpen, onClose }) => {
  const { user } = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const logOutUser = async () => {
    await logOutFetch(dispatch);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setModalOpen(false);
    onClose();
    navigate('/');
  };

  return (
    <>
      <div
        className={`
        fixed top-0 ${isOpen ? 'left-0' : 'left-[-100%]'}
        w-[80%] ss:w-[70%] h-full transition-all duration-200 bg-white z-[9999999] block md:hidden`}
      >
        <div className='my-5 pb-5 border-b border-gray-400 mx-3'>
          <img className='mx-auto w-32' src={logo} alt='*' />
        </div>
        <ul className='py-6 px-2 sidebar overflow-hidden overflow-y-scroll flex flex-col justify-between h-[calc(100%_-_102px)]'>
          <div>
            <li className='mb-3 flex items-center'>
              <NavLink
                to='/'
                onClick={() => onClose()}
                className='ss:text-lg sm:text-xl font-medium p-2 rounded-lg flex w-full'
              >
                <img src={home} alt='*' />
                <span className='pl-2'>Главная</span>
              </NavLink>
            </li>
            <li className='my-3'>
              <div
                onClick={toggleProfileMenu}
                className='p-2 rounded-lg flex justify-between items-center w-full'
              >
                <div className='flex items-center'>
                  <img src={userIcon} alt='*' />
                  <span className='ss:text-lg sm:text-xl font-medium pl-2'>
                    Профиль
                  </span>
                </div>
                <img
                  className={`${
                    isProfileMenuOpen ? 'rotate-180' : ''
                  } duration-200`}
                  src={arrow}
                  alt='*'
                />
              </div>
              <ul
                className={`${
                  isProfileMenuOpen ? 'flex' : 'hidden'
                } ml-4 bg-gray-100 p-3 rounded-b-xl rounded-tr-xl mt-1 flex-col space-y-3`}
              >
                <li className='flex items-center'>
                  <NavLink
                    onClick={() => onClose()}
                    to='/profile/personal-data'
                    className='text-base font-medium opacity-70 flex items-center'
                  >
                    <img className='w-5' src={profileUser} alt='*' />
                    <span className='pl-2'>Личные данные</span>
                  </NavLink>
                </li>
                <li className='flex items-center'>
                  <NavLink
                    onClick={() => onClose()}
                    to='/profile/my-parcels'
                    className='text-base font-medium opacity-70 flex items-center'
                  >
                    <img className='w-5' src={profileBox} alt='*' />
                    <span className='pl-2'>Мои посылки</span>
                  </NavLink>
                </li>
                <li className='flex items-center'>
                  <NavLink
                    onClick={() => onClose()}
                    to='/profile/notifications'
                    className='text-base font-medium opacity-70 flex items-center'
                  >
                    <img className='w-5' src={profileNotif} alt='*' />
                    <span className='pl-2'>Уведомления</span>
                  </NavLink>
                </li>
                <li className='flex items-center'>
                  <NavLink
                    onClick={() => onClose()}
                    to='/profile/my-wallet'
                    className='text-base font-medium opacity-70 flex items-center'
                  >
                    <img className='w-5' src={profileWallet} alt='*' />
                    <span className='pl-2'>Мой кошелёк</span>
                  </NavLink>
                </li>
                <li className='flex items-center'>
                  <NavLink
                    onClick={() => onClose()}
                    to='/profile/my-applications'
                    className='text-base font-medium opacity-70 flex items-center'
                  >
                    <img className='w-5' src={time} alt='*' />
                    <span className='pl-2'>Мои заявки</span>
                  </NavLink>
                </li>
                <li className='flex items-center'>
                  <NavLink
                    onClick={() => onClose()}
                    to='/profile/saved-addresses'
                    className='text-base font-medium opacity-70 flex items-center'
                  >
                    <img className='w-5' src={location} alt='*' />
                    <span className='pl-2'>Сохраненные адреса</span>
                  </NavLink>
                </li>
                <li className='flex items-center'>
                  <NavLink
                    onClick={() => onClose()}
                    to='/profile/gb-chat'
                    className='text-base font-medium opacity-70 flex items-center'
                  >
                    <img className='w-5' src={gbChat} alt='*' />
                    <span className='pl-2'>GB-Чат</span>
                  </NavLink>
                </li>
                <li className='flex items-center'>
                  <NavLink
                    onClick={() => onClose()}
                    to='/profile/tech-chat'
                    className='text-base font-medium opacity-70 flex items-center'
                  >
                    <img className='w-5' src={chat} alt='*' />
                    <span className='pl-2'>Чат с поддержкой</span>
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className='my-3 flex items-center'>
              <NavLink
                to='/tracking'
                onClick={() => onClose()}
                className='ss:text-lg sm:text-xl font-medium p-2 rounded-lg flex w-full'
              >
                <img src={box} alt='*' />
                <span className='pl-2'>Трекинг посылок</span>
              </NavLink>
            </li>
            <li className='my-3 flex items-center'>
              <NavLink
                to='/depots'
                onClick={() => onClose()}
                className='ss:text-lg sm:text-xl font-medium p-2 rounded-lg flex w-full'
              >
                <img src={depot} alt='*' />
                <span className='pl-2'>Наши склады</span>
              </NavLink>
            </li>
            <li className='my-3 flex items-center'>
              <NavLink
                to='/applications'
                onClick={() => onClose()}
                className='ss:text-lg sm:text-xl font-medium p-2 rounded-lg flex w-full'
              >
                <img src={sendBox} alt='*' />
                <span className='pl-2'>Отправка</span>
              </NavLink>
            </li>
            <li className='my-3 flex items-center'>
              <NavLink
                to='/gb-buyer'
                onClick={() => onClose()}
                className='ss:text-lg sm:text-xl font-medium p-2 rounded-lg flex w-full'
              >
                <img src={buyer} alt='*' />
                <span className='pl-2'>GB-Buyer</span>
              </NavLink>
            </li>
            <li className='my-3 flex items-center'>
              <NavLink
                to='/gb-business'
                onClick={() => onClose()}
                className='ss:text-lg sm:text-xl font-medium p-2 rounded-lg flex w-full'
              >
                <img src={bussines} alt='*' />
                <span className='pl-2'>GB-Business</span>
              </NavLink>
            </li>
          </div>
          {user ? (
            <li className='mt-10'>
              <button
                onClick={() => {
                  setModalOpen(true);
                  setModalContent('logout');
                }}
                className='ss:text-lg sm:text-xl font-medium p-2 rounded-lg flex w-full items-center'
              >
                <img src={logout} alt='*' />
                <span className='ml-3'>Выйти</span>
              </button>
            </li>
          ) : (
            <li className='mt-10 w-full'>
              <NavLink
                to='/auth/sign-in'
                className='p-4 rounded-lg bg-black text-white flex justify-center items-center font-bold hover:opacity-80 duration-150'
              >
                Войти
              </NavLink>
            </li>
          )}
        </ul>
        <Modal
          isOpen={modalOpen}
          onClose={closeModal}
          content={modalContent}
          logOutUser={logOutUser}
        />
      </div>
      <div
        onClick={() => onClose()}
        className={`
          fixed ${isOpen ? 'visible opacity-100' : 'invisible opacity-0'}
          top-0 right-0 w-full h-full bg-black bg-opacity-50 z-[999999] 
          transition-opacity duration-300 ease-in-out block md:hidden
        `}
      ></div>
    </>
  );
};

export default MobileMenu;
