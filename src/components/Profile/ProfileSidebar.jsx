import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOutFetch } from '../../api/user';
import Modal from '../../helpers/Modals/Modal';
import logout from './../../assets/icons/logout.svg';
import profile from './../../assets/icons/new-profile.svg';
import parcel from './../../assets/icons/my-parcel.svg';
import wallet from './../../assets/icons/wallet.svg';
import notification from './../../assets/icons/notification2.svg';
import location from './../../assets/icons/new-location.svg';
import chat from './../../assets/icons/chat.svg';
import gbChat from './../../assets/icons/gb-chat.svg';
import applicationIcon from './../../assets/icons/box-tick.svg';
import ordersIcon from './../../assets/icons/orders.svg';

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
        <ul className='border-r border-colGray2 pb-24 pt-6 sidebar pr-5 lg:pr-10 hidden md:flex flex-col space-y-3'>
          <li>
            <NavLink
              to='personal-data'
              className='flex items-center p-2 rounded-lg'
            >
              <img className='pr-3' src={profile} alt='*' />
              <span className='text-lg'>Личные данные</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to='my-parcels'
              className='flex items-center p-2 rounded-lg'
            >
              <img className='pr-3' src={parcel} alt='*' />
              <span className='text-lg'>Мои посылки</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to='my-applications'
              className='flex items-center p-2 rounded-lg'
            >
              <img className='pr-3' src={ordersIcon} alt='*' />
              <span className='text-lg'>Мои заявки</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to='buy-request'
              className='flex items-center p-2 rounded-lg'
            >
              <img className='pr-3' src={applicationIcon} alt='*' />
              <span className='text-lg'>Заявка на покупку</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to='gb-chat'
              className='flex items-center p-2 rounded-lg'
            >
              <img className='pr-3' src={gbChat} alt='*' />
              <span className='text-lg'>GB-Чат</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to='tech-chat'
              className='flex items-center p-2 rounded-lg'
            >
              <img className='pr-3' src={chat} alt='*' />
              <span className='text-lg'>Чат с поддержкой</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to='notifications'
              className='flex items-center p-2 rounded-lg'
            >
              <img className='pr-3' src={notification} alt='*' />
              <span className='text-lg'>Уведомления</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to='my-wallet'
              className='flex items-center p-2 rounded-lg'
            >
              <img className='pr-3' src={wallet} alt='*' />
              <span className='text-lg'>Мой кошелёк</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to='saved-addresses'
              className='flex items-center p-2 rounded-lg'
            >
              <img className='pr-3' src={location} alt='*' />
              <span className='text-lg'>Сохранённые адреса</span>
            </NavLink>
          </li>
          <li>
            <button
              onClick={() => {
                setModalOpen(true);
                setModalContent('logout');
              }}
              className='flex items-center p-2 rounded-lg mt-5'
            >
              <img className='pr-3' src={logout} alt='*' />
              <span className='text-lg'>Выйти</span>
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
