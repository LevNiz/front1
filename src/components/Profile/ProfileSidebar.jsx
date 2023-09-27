import { NavLink, useNavigate } from 'react-router-dom';
import logout from './../../assets/icons/logout.svg';
import profile from './../../assets/icons/new-profile.svg';
import parcel from './../../assets/icons/my-parcel.svg';
import logo from './../../assets/icons/logo-mob.svg';
import burger from './../../assets/icons/burger.svg';
import wallet from './../../assets/icons/wallet.svg';
import notification from './../../assets/icons/notification2.svg';
import { logOutFetch } from '../../api/user';
import { useDispatch } from 'react-redux';
import Modal from '../../helpers/Modals/Modal';
import { useState } from 'react';

const ProfileSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState();
  const [showSidebar, setShowSidebar] = useState(false);

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
      <button
        onClick={() => setShowSidebar(true)}
        className='absolute top-1 right-2 sm:hidden'
      >
        <img src={burger} alt='*' />
      </button>
      <div
        className={`
        fixed top-0 ${showSidebar ? 'left-0' : 'left-[-100%]'}
        w-[70%] h-full sm:w-auto sm:h-auto transition-all duration-200 bg-white z-[99999]
        sm:static sm:top-auto sm:min-w-[54px] md:min-w-[240px] md:max-w-[240px] lg:min-w-[300px] lg:max-w-[300px] md:w-full
      `}
      >
        <div className='sm:hidden my-6 pb-5 border-b border-gray-400 mx-3'>
          <img className='mx-auto w-32' src={logo} alt='*' />
        </div>
        <ul className='sm:border-r border-colGray2 pb-24 pt-6 sidebar px-5 sm:pl-0 sm:pr-3 md:pr-5 lg:pr-10'>
          <li onClick={() => setShowSidebar(false)} className='mb-10'>
            <NavLink
              to='personal-data'
              className='ss:text-lg sm:text-xl flex items-center p-2 rounded-lg'
            >
              <img className='pr-2 sm:pr-0 md:pr-3' src={profile} alt='*' />
              <span className='md:block sm:hidden'>Личные данные</span>
            </NavLink>
          </li>
          <li onClick={() => setShowSidebar(false)} className='my-10'>
            <NavLink
              to='my-parcels'
              className='ss:text-lg sm:text-xl flex items-center p-2 rounded-lg'
            >
              <img className='pr-2 sm:pr-0 md:pr-3' src={parcel} alt='*' />
              <span className='md:block sm:hidden'>Мои посылки</span>
            </NavLink>
          </li>
          <li onClick={() => setShowSidebar(false)} className='my-10'>
            <NavLink
              to='notifications'
              className='ss:text-lg sm:text-xl flex items-center p-2 rounded-lg'
            >
              <img
                className='pr-2 sm:pr-0 md:pr-3'
                src={notification}
                alt='*'
              />
              <span className='md:block sm:hidden'>Уведомления</span>
            </NavLink>
          </li>
          <li onClick={() => setShowSidebar(false)} className='my-10'>
            <NavLink
              to='my-wallet'
              className='ss:text-lg sm:text-xl flex items-center p-2 rounded-lg'
            >
              <img className='pr-2 sm:pr-0 md:pr-3' src={wallet} alt='*' />
              <span className='md:block sm:hidden'>Мой кошелёк</span>
            </NavLink>
          </li>
          <li
            onClick={() => setShowSidebar(false)}
            className='mt-24 absolute sm:static bottom-[20px] sm:bottom-auto'
          >
            <button
              onClick={() => {
                setModalOpen(true);
                setModalContent('logout');
              }}
              className='ss:text-lg sm:text-xl flex items-center p-2 rounded-lg'
            >
              <img className='pr-2 sm:pr-0 md:pr-3' src={logout} alt='*' />
              <span className='md:block sm:hidden'>Выйти</span>
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
        onClick={() => setShowSidebar(false)}
        className={`
          fixed ${showSidebar ? 'visible opacity-100' : 'invisible opacity-0'}
          top-0 right-0 w-full h-full bg-black bg-opacity-50 z-[9999] 
          transition-opacity duration-300 ease-in-out
        `}
      ></div>
    </>
  );
};

export default ProfileSidebar;
