import { NavLink, useNavigate } from 'react-router-dom';
import logout from './../../assets/icons/logout.svg';
import profile from './../../assets/icons/new-profile.svg';
import parcel from './../../assets/icons/my-parcel.svg';
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
          <li className='mb-10'>
            <NavLink
              to='personal-data'
              className='text-xl flex items-center p-2 rounded-lg'
            >
              <img className='pr-3' src={profile} alt='*' />
              <span>Личные данные</span>
            </NavLink>
          </li>
          <li className='my-10'>
            <NavLink
              to='my-parcels'
              className='text-xl flex items-center p-2 rounded-lg'
            >
              <img className='pr-3' src={parcel} alt='*' />
              <span>Мои посылки</span>
            </NavLink>
          </li>
          <li className='my-10'>
            <NavLink
              to='notifications'
              className='text-xl flex items-center p-2 rounded-lg'
            >
              <img className='pr-3' src={notification} alt='*' />
              <span>Уведомления</span>
            </NavLink>
          </li>
          <li className='my-10'>
            <NavLink
              to='my-wallet'
              className='text-xl flex items-center p-2 rounded-lg'
            >
              <img className='pr-3' src={wallet} alt='*' />
              <span>Мой кошелёк</span>
            </NavLink>
          </li>
          <li className='mt-24'>
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
