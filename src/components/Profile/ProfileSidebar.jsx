import { NavLink, useNavigate } from 'react-router-dom';
import logout from './../../assets/icons/logout.svg';
import profile from './../../assets/icons/profile2.svg';
import parcel from './../../assets/icons/my-parcel.svg';
import notification from './../../assets/icons/notification2.svg';
import { logOutFetch } from '../../api/auth';
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
    <div className='min-w-[54px] md:min-w-[240px] md:max-w-[240px] lg:min-w-[300px] lg:max-w-[300px] md:w-full'>
      <ul className='border-r border-colGray2 pb-24 pt-6 sidebar pr-3 md:pr-5 lg:pr-10'>
        <li className='mb-10'>
          <NavLink
            to='personal-data'
            className='text-xl flex items-center p-2 rounded-lg'
          >
            <img className='md:pr-3' src={profile} alt='*' />
            <span className='md:block hidden'>Личные данные</span>
          </NavLink>
        </li>
        <li className='my-10'>
          <NavLink
            to='my-parcels'
            className='text-xl flex items-center p-2 rounded-lg'
          >
            <img className='md:pr-3' src={parcel} alt='*' />
            <span className='md:block hidden'>Мои посылки</span>
          </NavLink>
        </li>
        <li className='my-10'>
          <NavLink
            to='notifications'
            className='text-xl flex items-center p-2 rounded-lg'
          >
            <img className='md:pr-3' src={notification} alt='*' />
            <span className='md:block hidden'>Уведомления</span>
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
            <img className='md:pr-3' src={logout} alt='*' />
            <span className='md:block hidden'>Выйти</span>
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
  );
};

export default ProfileSidebar;
