import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MobileMenu from './MobileMenu';
import logo from './../../assets/images/header-logo.svg';
import userImg from './../../assets/icons/user.svg';
import chat from './../../assets/icons/messages.svg';
import arrow from './../../assets/icons/arrow-white.svg';
import notification from './../../assets/icons/notification.svg';
import arrowRight from './../../assets/icons/right-icon.svg';
import { fetchCountries } from '../../api/countries';
import { fetchDepots } from '../../api/depots';
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from '@material-tailwind/react';

const Navbar = ({ TechChatNotification, gbChatNotification }) => {
  const [loginModal, setLoginModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [depotsID, setDepotID] = useState(null);

  const { depots } = useSelector((state) => state?.depots);
  const { countries } = useSelector((state) => state?.countries);
  const { user } = useSelector((state) => state?.user);
  const dispatch = useDispatch();

  const { pathname } = useLocation();
  const modalRef = useRef();

  const filteredCountries = countries?.filter((el) =>
    depots?.some((depot) => el?.id === depot?.country?.id)
  );

  const filteredDepotCities = depots?.filter(
    (el) => el?.country?.id === depotsID
  );

  const handleOutSideModal = (e) => {
    if (!modalRef.current.contains(e.target)) {
      setLoginModal(false);
    }
  };

  const handleCloseMenu = () => {
    setShowSidebar(false);
  };

  useEffect(() => {
    (async () => {
      await fetchCountries(dispatch);
      await fetchDepots(dispatch);
    })();
  }, [dispatch]);

  useEffect(() => {
    setScrolling(false);
    setPrevScrollPos(0);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const threshold = 900;
      if (currentScrollPos > threshold) {
        setScrolling(prevScrollPos < currentScrollPos);
      }
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <div className='relative'>
      <header
        className={`${
          scrolling ? '-translate-y-full' : 'translate-y-0'
        } bg-black h-[58px] flex items-center fixed top-0 w-full transition-transform duration-300 ease-in-out z-[9999999]`}
      >
        <div className='container flex justify-between items-center'>
          <NavLink to='/'>
            <img className='w-28 sm:w-32' src={logo} alt='*' />
          </NavLink>
          <ul className='hidden md:flex space-x-3 lg:space-x-5 items-center text-white'>
            <li className='navbar'>
              <NavLink to='/' className='text-sm lg:text-base'>
                Главная
              </NavLink>
            </li>
            <li className='navbar'>
              <NavLink to='/tracking' className='text-sm lg:text-base'>
                Трекинг посылок
              </NavLink>
            </li>
            <li className='relative flex items-center'>
              <NavLink
                to='/depots'
                className='text-sm lg:text-base cursor-pointer'
              >
                Наши склады
              </NavLink>
              <Menu>
                <MenuHandler className='w-max flex items-center p-0'>
                  <MenuItem className='text-sm lg:text-base p-0'>
                    <img className='w-4 ml-1 mt-[2px]' src={arrow} alt='*' />
                  </MenuItem>
                </MenuHandler>
                <MenuList className='!p-0 rounded-sm w-60 h-60 !mt-4 bg-white text-black flex flex-col overflow-y-scroll shadow-lg scrollable'>
                  {filteredCountries?.map((el) => (
                    <Menu
                      placement='right-start'
                      allowHover
                      offset={15}
                      key={el?.id}
                    >
                      <MenuHandler className='flex items-center justify-between py-2 hover:bg-colYellow duration-200 rounded-none border-b border-[#C3C3C3]'>
                        <MenuItem>
                          <div
                            key={el?.id}
                            onMouseEnter={() => setDepotID(el?.id)}
                            onMouseDown={() => setDepotID(el?.id)}
                            className='relative cursor-pointer outline-none w-full flex justify-between items-center'
                          >
                            <div className='flex items-center'>
                              <div className='w-6 h-6 min-w-[24px] mr-2 rounded-full overflow-hidden'>
                                <img
                                  className='w-full h-full object-cover'
                                  src={el?.icon}
                                  alt=''
                                />
                              </div>
                              <span className='line-clamp-1 break-all font-medium text-[15px]'>
                                {el?.nameRu}
                              </span>
                            </div>
                            <img
                              className='h-[15px]'
                              src={arrowRight}
                              alt='*'
                            />
                          </div>
                        </MenuItem>
                      </MenuHandler>
                      <MenuList className='p-0'>
                        {filteredDepotCities?.map((el) => (
                          <MenuItem
                            className={`${
                              el?.active
                                ? ''
                                : 'pointer-events-none cursor-not-allowed opacity-40'
                            } py-[10px] hover:bg-colYellow duration-200`}
                            key={el?.id}
                          >
                            <NavLink className='px-2' to={`/depots/${el?.id}`}>
                              г. {el?.city?.nameRu}
                            </NavLink>
                          </MenuItem>
                        ))}
                      </MenuList>
                    </Menu>
                  ))}
                </MenuList>
              </Menu>
            </li>
            <li className='navbar'>
              <NavLink to='/applications' className='text-sm lg:text-base'>
                Отправка
              </NavLink>
            </li>
            <li className='relative group cursor-pointer flex items-center'>
              <span className='text-sm lg:text-base'>Сервисы</span>
              <img className='w-4 ml-1 mt-[2px]' src={arrow} alt='*' />
              <div className='absolute pt-4 left-0 top-full opacity-0 invisible group-hover:visible group-hover:opacity-100 duration-300 w-56'>
                <ul className='bg-white rounded-sm shadow-md text-black'>
                  <li>
                    <NavLink
                      className='hover:bg-colYellow px-4 py-2 border-b border-[#C3C3C3] duration-150 text-[15px] font-medium flex items-center'
                      to='/gb-shop'
                      target='_blank'
                    >
                      GB-Shop
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className='hover:bg-colYellow px-4 py-2 border-b border-[#C3C3C3] duration-150 text-[15px] font-medium flex items-center'
                      to='/gb-business'
                    >
                      GB-Business
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className='hover:bg-colYellow px-4 py-2 border-b border-[#C3C3C3] duration-150 text-[15px] font-medium flex items-center'
                      to='/gb-franchise'
                    >
                      GB-Franchise
                    </NavLink>
                  </li>
                  {/* <li>
                    <NavLink
                      onClick={() => alert('В процессе разработки!')}
                      className='hover:bg-colYellow px-4 py-2 border-b border-[#C3C3C3] duration-150 text-[15px] font-medium flex items-center'
                      to='#'
                    >
                      GB-Pay
                    </NavLink>
                  </li> */}
                  <li>
                    <NavLink
                      className='hover:bg-colYellow px-4 py-2 border-b border-[#C3C3C3] duration-150 text-[15px] font-medium flex items-center'
                      to='/gb-buyer'
                    >
                      GB-Buyer
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className='hover:bg-colYellow px-4 py-2 border-b border-[#C3C3C3] duration-150 text-[15px] font-medium flex items-center'
                      to='/gb-chat'
                    >
                      GB-Chat
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className='hover:bg-colYellow px-4 py-2 duration-150 text-[15px] font-medium flex items-center'
                      to='/alaket'
                    >
                      Alaket
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
          <div className='flex justify-end items-center'>
            {user ? (
              <ul className='flex items-center justify-end space-x-4'>
                <li className='hidden sm:block'>
                  <NavLink to='profile/notifications'>
                    <img
                      className='w-[27px] md:w-6'
                      src={notification}
                      alt='*'
                    />
                  </NavLink>
                </li>
                <li className='relative'>
                  <NavLink to='/gb-chat'>
                    <img className='w-[27px] md:w-6' src={chat} alt='*' />
                  </NavLink>
                  <span
                    className={`${
                      gbChatNotification ? 'hidden' : ''
                    } absolute top-0 left-0 bg-red-500 h-2 w-2 rounded-full`}
                  ></span>
                </li>
                <li className='relative'>
                  <NavLink to='profile/personal-data'>
                    <img className='w-[27px] md:w-6' src={userImg} alt='*' />
                  </NavLink>
                  <span
                    className={`${
                      TechChatNotification ? 'md:block' : 'hidden'
                    } hidden absolute top-0 left-0 bg-red-500 h-2 w-2 rounded-full`}
                  ></span>
                </li>
              </ul>
            ) : (
              <button
                onClick={() => setLoginModal(true)}
                className='hidden md:block bg-colYellow w-24 h-10 rounded-lg hover:bg-colYellowHover duration-100'
              >
                Войти
              </button>
            )}
            <div
              onClick={() => setShowSidebar(true)}
              className='flex flex-col space-y-[7px] w-8 cursor-pointer md:hidden ml-5 relative'
            >
              <span className='w-full h-[2.5px] rounded-md bg-colYellow'></span>
              <span className='w-full h-[2.5px] rounded-md bg-colYellow'></span>
              <span className='w-full h-[2.5px] rounded-md bg-colYellow'></span>
              <span
                className={`${
                  TechChatNotification ? 'block' : 'hidden'
                } absolute -top-[10px] left-0 bg-red-500 h-2 w-2 rounded-full`}
              ></span>
            </div>
          </div>
        </div>
      </header>
      {loginModal ? (
        <div
          onClick={(e) => handleOutSideModal(e)}
          className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 z-[999999]'
        >
          <div
            ref={modalRef}
            className='absolute top-[100px] right-10 max-w-[370px] w-full bg-white z-[999] p-8 flex flex-col space-y-5 rounded-2xl'
          >
            <NavLink
              to='auth/sign-in'
              className='w-full p-3 bg-black text-white rounded-lg text-center hover:opacity-80 duration-100'
            >
              Войти
            </NavLink>
            <NavLink
              to='auth/sign-up'
              className='w-full p-3 bg-black text-white rounded-lg text-center hover:opacity-80 duration-100'
            >
              Зарегистрироваться
            </NavLink>
          </div>
        </div>
      ) : (
        ''
      )}
      <MobileMenu
        TechChatNotification={TechChatNotification}
        isOpen={showSidebar}
        onClose={handleCloseMenu}
      />
    </div>
  );
};

export default Navbar;
