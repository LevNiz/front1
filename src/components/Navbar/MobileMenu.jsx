/* eslint-disable react/prop-types */
import { NavLink, useNavigate } from 'react-router-dom';
import logout from './../../assets/icons/logout.svg';
import location from './../../assets/icons/new-location.svg';
import parcel from './../../assets/icons/my-parcel.svg';
import logo from './../../assets/icons/logo-mob.svg';
import home from './../../assets/icons/home.svg';
import profile from './../../assets/icons/new-profile.svg';
import business from './../../assets/icons/business.svg';
import { logOutFetch } from '../../api/user';
import { useDispatch } from 'react-redux';
import Modal from '../../helpers/Modals/Modal';
import { useState } from 'react';

const MobileMenu = ({ isOpen, onClose }) => {
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
      <div
        className={`
        fixed top-0 ${isOpen ? 'left-0' : 'left-[-100%]'}
        w-[80%] ss:w-[70%] h-full transition-all duration-200 bg-white z-[9999999] block md:hidden`}
      >
        <div className='my-5 pb-5 border-b border-gray-400 mx-3'>
          <img className='mx-auto w-32' src={logo} alt='*' />
        </div>
        <ul className='py-6 px-3'>
          <li className='mb-5'>
            <NavLink
              to='/'
              onClick={() => onClose()}
              className='ss:text-lg sm:text-xl flex items-center p-2 rounded-lg'
            >
              <img src={home} alt='*' />
              <span className='ml-3'>Главная</span>
            </NavLink>
          </li>
          <li className='my-5'>
            <NavLink
              to='/profile/personal-data'
              onClick={() => onClose()}
              className='ss:text-lg sm:text-xl flex items-center p-2 rounded-lg'
            >
              <img src={profile} alt='*' />
              <span className='ml-3'>Профиль</span>
            </NavLink>
          </li>
          <li className='my-5'>
            <NavLink
              to='/tracking'
              onClick={() => onClose()}
              className='ss:text-lg sm:text-xl flex items-center p-2 rounded-lg'
            >
              <img src={parcel} alt='*' />
              <span className='ml-3'>Трекинг посылок</span>
            </NavLink>
          </li>
          <li className='my-5'>
            <NavLink
              to='/depots'
              onClick={() => onClose()}
              className='ss:text-lg sm:text-xl flex items-center p-2 rounded-lg'
            >
              <img src={location} alt='*' />
              <span className='ml-3'>Наши склады</span>
            </NavLink>
          </li>
          <li className='my-5'>
            <NavLink
              to='/gb-buyer'
              onClick={() => onClose()}
              className='ss:text-lg sm:text-xl flex items-center p-2 rounded-lg'
            >
              <img src={profile} alt='*' />
              <span className='ml-3'>GB-Байер</span>
            </NavLink>
          </li>
          <li className='my-5'>
            <NavLink
              to='/gb-business'
              onClick={() => onClose()}
              className='ss:text-lg sm:text-xl flex items-center p-2 rounded-lg'
            >
              <img src={business} alt='*' />
              <span className='ml-3'>GB-Бизнес</span>
            </NavLink>
          </li>
          <li className='mt-10 absolute bottom-4'>
            <button
              onClick={() => {
                setModalOpen(true);
                setModalContent('logout');
              }}
              className='ss:text-lg sm:text-xl flex items-center p-2 rounded-lg'
            >
              <img src={logout} alt='*' />
              <span className='ml-3'>Выйти</span>
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
