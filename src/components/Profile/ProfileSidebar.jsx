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
        <ul className='border-r border-colGray2 pb-24 pt-6 sidebar pr-5 lg:pr-10 hidden md:flex flex-col space-y-4'>
          <li>
            <NavLink
              to='personal-data'
              className='text-xl flex items-center p-2 rounded-lg'
            >
              <img className='pr-3' src={profile} alt='*' />
              <span>Личные данные</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to='my-parcels'
              className='text-xl flex items-center p-2 rounded-lg'
            >
              <img className='pr-3' src={parcel} alt='*' />
              <span>Мои посылки</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to='my-applications'
              className='text-xl flex items-center p-2 rounded-lg'
            >
              <img className='pr-3' src={ordersIcon} alt='*' />
              <span>Мои заявки</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to='buy-request'
              className='text-xl flex items-center p-2 rounded-lg'
            >
              <img className='pr-3' src={applicationIcon} alt='*' />
              <span>Заявка на покупку</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to='gb-chat'
              className='text-xl flex items-center p-2 rounded-lg'
            >
              <img className='pr-3' src={gbChat} alt='*' />
              <span>GB-Чат</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to='tech-chat'
              className='text-xl flex items-center p-2 rounded-lg'
            >
              <img className='pr-3' src={chat} alt='*' />
              <span>Чат с поддержкой</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to='notifications'
              className='text-xl flex items-center p-2 rounded-lg'
            >
              <img className='pr-3' src={notification} alt='*' />
              <span>Уведомления</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to='my-wallet'
              className='text-xl flex items-center p-2 rounded-lg'
            >
              <img className='pr-3' src={wallet} alt='*' />
              <span>Мой кошелёк</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to='saved-addresses'
              className='text-xl flex items-center p-2 rounded-lg'
            >
              <img className='pr-3' src={location} alt='*' />
              <span>Сохранённые адреса</span>
            </NavLink>
          </li>
          <li>
            <button
              onClick={() => {
                setModalOpen(true);
                setModalContent('logout');
              }}
              className='text-xl flex items-center p-2 rounded-lg mt-5'
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
