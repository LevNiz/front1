import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logOutFetch } from '../../api/user';
import Modal from '../../helpers/Modals/Modal';

import logout from './../../assets/icons/logout.svg';
import logo from './../../assets/images/header-logo.svg';
import arrow from './../../assets/icons/down.svg';
import home from './../../assets/icons/mobile-menu/home.svg';
import depot from './../../assets/icons/mobile-menu/depot.svg';
import userIcon from './../../assets/icons/mobile-menu/user.svg';
import buyer from './../../assets/icons/mobile-menu/buyer.svg';
import services from './../../assets/icons/services.svg';
import business from './../../assets/icons/mobile-menu/bussines.svg';
import box from './../../assets/icons/mobile-menu/box.svg';
import profileUser from './../../assets/icons/mobile-menu/profile-user.svg';
import profileBox from './../../assets/icons/mobile-menu/profile-box.svg';
import profileNotif from './../../assets/icons/mobile-menu/profile-notification.svg';
import profileWallet from './../../assets/icons/mobile-menu/profile-wallet.svg';
import sendBox from './../../assets/icons/mobile-menu/send-box.svg';
import location from './../../assets/icons/new-location.svg';
import chat from './../../assets/icons/chat.svg';
import applicationIcon from './../../assets/icons/box-tick.svg';
import ordersIcon from './../../assets/icons/orders.svg';
import searchIcon from './../../assets/icons/search-item.svg';
import gbShop from './../../assets/icons/gb-shop.svg';
// import gbCoin from './../../assets/icons/gb-pay.svg';
import alaket from './../../assets/icons/alaket.svg';
import gbFranchise from './../../assets/icons/gb-franchise.svg';
import { fetchCountries } from '../../api/countries';
import { fetchAllDepots } from '../../api/depots';

const MobileMenu = ({ isOpen, onClose, TechChatNotification }) => {
  const { user } = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isServices, setIsServices] = useState(false);
  const [isDepots, setIsDepots] = useState(false);
  const [allDepots, setAllDepots] = useState([]);

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const toggleServices = () => {
    setIsServices(!isServices);
  };

  const toggleDepots = () => {
    setIsDepots(!isDepots);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const logOutUser = () => {
    logOutFetch(dispatch);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setModalOpen(false);
    onClose();
    navigate('/');
  };

  useEffect(() => {
    (async () => {
      await fetchCountries(dispatch);
    })();
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      const allDepotsData = await fetchAllDepots();
      setAllDepots(allDepotsData);
    })();
  }, []);

  return (
    <>
      <div
        className={`
        fixed top-0 ${isOpen ? 'left-0' : 'left-[-100%]'}
        w-[82%] ss:w-[80%] h-full transition-all duration-200 bg-white z-[9999999] block md:hidden`}
      >
        <div className='h-[58px] flex justify-center items-center bg-black mb-5 border-b border-gray-400 px-3'>
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
                  <span
                    className={`${
                      TechChatNotification ? 'block' : 'hidden'
                    } ml-2 mt-[2px] bg-red-500 h-2 w-2 rounded-full`}
                  ></span>
                </div>
                <img
                  className={`${
                    isProfileMenuOpen ? 'rotate-180' : ''
                  } duration-200 w-4`}
                  src={arrow}
                  alt='*'
                />
              </div>
              <ul
                className={`${
                  isProfileMenuOpen ? 'flex' : 'hidden'
                } ml-4 bg-gray-100 p-3 rounded-b-xl rounded-tr-xl flex-col space-y-3 mr-2`}
              >
                <li className='flex items-center'>
                  <NavLink
                    onClick={() => onClose()}
                    to='/profile/personal-data'
                    className='text-base flex items-center'
                  >
                    <img
                      className='min-w-[18px] w-[18px]'
                      src={profileUser}
                      alt='*'
                    />
                    <span className='pl-1 sm:text-[15px] leading-5'>
                      Личные данные
                    </span>
                  </NavLink>
                </li>
                <li className='flex items-center'>
                  <NavLink
                    onClick={() => onClose()}
                    to='/profile/my-parcels'
                    className='text-base flex items-center'
                  >
                    <img
                      className='min-w-[18px] w-[18px]'
                      src={profileBox}
                      alt='*'
                    />
                    <span className='pl-1 sm:text-[15px] leading-5'>
                      Мои отправки
                    </span>
                  </NavLink>
                </li>
                <li className='flex items-center'>
                  <NavLink
                    onClick={() => onClose()}
                    to='/profile/my-applications'
                    className='text-base flex items-center'
                  >
                    <img
                      className='min-w-[18px] w-[18px]'
                      src={ordersIcon}
                      alt='*'
                    />
                    <span className='pl-1 sm:text-[15px] leading-5'>
                      Заявки на отправку
                    </span>
                  </NavLink>
                </li>
                <li className='flex items-center'>
                  <NavLink
                    onClick={() => onClose()}
                    to='/profile/buy-request'
                    className='text-base flex items-start'
                  >
                    <img
                      className='min-w-[18px] w-[18px]'
                      src={applicationIcon}
                      alt='*'
                    />
                    <span className='pl-1 sm:text-[15px] leading-5'>
                      Заявки на покупку товара
                    </span>
                  </NavLink>
                </li>
                <li className='flex items-center'>
                  <NavLink
                    onClick={() => onClose()}
                    to='/profile/search-request'
                    className='text-base flex items-start'
                  >
                    <img
                      className='min-w-[18px] w-[18px]'
                      src={searchIcon}
                      alt='*'
                    />
                    <span className='pl-1 sm:text-[15px] leading-5'>
                      Заявки на поиск товара
                    </span>
                  </NavLink>
                </li>
                <li className='flex items-center'>
                  <NavLink
                    onClick={() => onClose()}
                    to='/profile/saved-addresses'
                    className='text-base flex items-center'
                  >
                    <img
                      className='min-w-[18px] w-[18px]'
                      src={location}
                      alt='*'
                    />
                    <span className='pl-1 sm:text-[15px] leading-5'>
                      Сохраненные адреса
                    </span>
                  </NavLink>
                </li>
                <li className='flex items-center'>
                  <NavLink
                    onClick={() => onClose()}
                    to='/profile/notifications'
                    className='text-base flex items-center'
                  >
                    <img
                      className='min-w-[18px] w-[18px]'
                      src={profileNotif}
                      alt='*'
                    />
                    <span className='pl-1 sm:text-[15px] leading-5'>
                      Уведомления
                    </span>
                  </NavLink>
                </li>
                <li className='flex items-center'>
                  <NavLink
                    onClick={() => onClose()}
                    to='/profile/my-wallet'
                    className='text-base flex items-center'
                  >
                    <img
                      className='min-w-[18px] w-[18px]'
                      src={profileWallet}
                      alt='*'
                    />
                    <span className='pl-1 sm:text-[15px] leading-5'>
                      Мой кошелёк
                    </span>
                  </NavLink>
                </li>
                <li className='flex items-center'>
                  <NavLink
                    onClick={() => onClose()}
                    to='/profile/tech-chat'
                    className='text-base flex items-center justify-between w-full'
                  >
                    <div className='flex items-center mr-1'>
                      <img
                        className='min-w-[18px] w-[18px]'
                        src={chat}
                        alt='*'
                      />
                      <span className='pl-1 sm:text-[15px] leading-5'>
                        Чат с поддержкой
                      </span>
                    </div>
                    <span
                      className={`${
                        TechChatNotification > 0 ? 'block' : 'hidden'
                      } bg-red-500 h-5 min-w-[20px] flex justify-center items-center text-[10px] text-white rounded-md px-1`}
                    >
                      {TechChatNotification}
                    </span>
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
            <li className='my-3'>
              <div className='flex justify-between items-center'>
                <div
                  onClick={() => {
                    onClose();
                    navigate('/depots');
                  }}
                  className='ss:text-lg sm:text-xl font-medium p-2 rounded-lg flex w-max'
                >
                  <img src={depot} alt='*' />
                  <span className='pl-2'>Наши склады</span>
                </div>
                <div onClick={toggleDepots} className='p-2'>
                  <img
                    className={`${
                      isDepots ? 'rotate-180' : ''
                    } duration-200 w-4`}
                    src={arrow}
                    alt='*'
                  />
                </div>
              </div>
              <ul
                className={`${
                  isDepots ? 'flex' : 'hidden'
                } ml-4 bg-gray-100 p-3 rounded-b-xl rounded-tr-xl mt-1 flex-col space-y-2 mr-2 overflow-y-scroll h-96`}
              >
                {allDepots?.map((el) => (
                  <li
                    key={el?.id}
                    onClick={() => onClose()}
                    className='flex items-center'
                  >
                    <NavLink
                      to={user ? `/depots/${el?.id}` : '/auth/sign-in'}
                      className={`${
                        el?.active
                          ? ''
                          : 'pointer-events-none cursor-not-allowed opacity-40'
                      } text-base flex items-center`}
                    >
                      <img
                        className='min-w-[20px] w-5 h-5 object-contain'
                        src={el?.country?.icon}
                        alt='*'
                      />
                      <span className='pl-1.5 line-clamp-1 break-all'>
                        {el?.nameRu}
                      </span>
                    </NavLink>
                  </li>
                ))}
              </ul>
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
            <li className='my-3'>
              <div
                onClick={toggleServices}
                className='p-2 rounded-lg flex justify-between items-center w-full'
              >
                <div className='flex items-center'>
                  <img src={services} alt='*' />
                  <span className='ss:text-lg sm:text-xl font-medium pl-2'>
                    Сервисы
                  </span>
                </div>
                <img
                  className={`${
                    isServices ? 'rotate-180' : ''
                  } duration-200 w-4`}
                  src={arrow}
                  alt='*'
                />
              </div>
              <ul
                className={`${
                  isServices ? 'flex' : 'hidden'
                } ml-4 bg-gray-100 p-3 rounded-b-xl rounded-tr-xl mt-1 flex-col space-y-3 mr-2`}
              >
                <li className='flex items-center'>
                  <NavLink
                    to='/gb-shop'
                    target='_blank'
                    className='text-base flex items-center'
                  >
                    <img
                      className='min-w-[18px] w-[18px]'
                      src={gbShop}
                      alt='*'
                    />
                    <span className='pl-1'>GB-Shop</span>
                  </NavLink>
                </li>
                <li className='flex items-center'>
                  <NavLink
                    onClick={() => onClose()}
                    to='/gb-business'
                    className='text-base flex items-center'
                  >
                    <img
                      className='min-w-[18px] w-[18px]'
                      src={business}
                      alt='*'
                    />
                    <span className='pl-1'>GB-Business</span>
                  </NavLink>
                </li>
                <li className='flex items-center'>
                  <NavLink
                    onClick={() => onClose()}
                    to='/gb-franchise'
                    className='text-base flex items-center'
                  >
                    <img
                      className='min-w-[18px] w-[18px]'
                      src={gbFranchise}
                      alt='*'
                    />
                    <span className='pl-1'>GB-Franchise</span>
                  </NavLink>
                </li>
                {/* <li className='flex items-center'>
                  <NavLink
                    onClick={() => {
                      onClose();
                      alert('В процессе разработки!');
                    }}
                    to='#'
                    className='text-base flex items-center'
                  >
                    <img
                      className='min-w-[18px] w-[18px]'
                      src={gbCoin}
                      alt='*'
                    />
                    <span className='pl-1'>GB-Pay</span>
                  </NavLink>
                </li> */}
                <li className='flex items-center'>
                  <NavLink
                    onClick={() => onClose()}
                    to='/gb-buyer'
                    className='text-base flex items-center'
                  >
                    <img
                      className='min-w-[18px] w-[18px]'
                      src={buyer}
                      alt='*'
                    />
                    <span className='pl-1'>GB-Buyer</span>
                  </NavLink>
                </li>
                <li className='flex items-center'>
                  <NavLink
                    onClick={() => onClose()}
                    to='/gb-chat'
                    className='text-base flex items-center'
                  >
                    <img className='min-w-[18px] w-[18px]' src={chat} alt='*' />
                    <span className='pl-1'>GB-Chat</span>
                  </NavLink>
                </li>
                <li className='flex items-center'>
                  <NavLink
                    onClick={() => onClose()}
                    to='/alaket'
                    className='text-base flex items-center'
                  >
                    <img
                      className='min-w-[18px] w-[18px]'
                      src={alaket}
                      alt='*'
                    />
                    <span className='pl-1'>GB-Alaket</span>
                  </NavLink>
                </li>
              </ul>
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
