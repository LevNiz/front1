import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import MobileMenu from './MobileMenu';
import logo from './../../assets/images/header-logo.svg';
import userImg from './../../assets/icons/user.svg';
import chat from './../../assets/icons/messages.svg';
import notification from './../../assets/icons/notification.svg';

const Navbar = ({ hasNotification }) => {
  const [loginModal, setLoginModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const { pathname } = useLocation();
  const modalRef = useRef();
  const user = localStorage.getItem('accessToken');

  const handleOutSideModal = (e) => {
    if (!modalRef.current.contains(e.target)) {
      setLoginModal(false);
    }
  };

  const handleCloseMenu = () => {
    setShowSidebar(false);
  };

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
        } bg-black py-4 lg:py-2 fixed top-0 w-full transition-transform duration-300 ease-in-out z-[999999]`}
      >
        <div className='container flex justify-between items-center'>
          <NavLink to='/'>
            <img
              className='w-[120px] mm:w-[140px] lg:w-auto'
              src={logo}
              alt='*'
            />
          </NavLink>
          <ul className='hidden md:flex space-x-3 lg:space-x-5 items-center text-white navbar'>
            <li>
              <NavLink to='/'>Главная</NavLink>
            </li>
            <li>
              <NavLink to='tracking'>Трекинг посылок</NavLink>
            </li>
            <li>
              <NavLink to='depots'>Наши склады</NavLink>
            </li>
            <li>
              <NavLink to='applications'>Отправка</NavLink>
            </li>
          </ul>
          <div className='flex justify-end items-center'>
            {user ? (
              <ul className='flex items-center justify-end space-x-4'>
                <li className='relative'>
                  <NavLink to='/gb-chat'>
                    <img className='w-[27px] md:w-6' src={chat} alt='*' />
                  </NavLink>
                  {/* <span
                    className={`${
                      hasNotification ? 'block' : 'hidden'
                    } absolute top-0 left-0 bg-red-500 h-2 w-2 rounded-full`}
                  ></span> */}
                </li>
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
                  <NavLink to='profile/personal-data'>
                    <img className='w-[27px] md:w-6' src={userImg} alt='*' />
                  </NavLink>
                  <span
                    className={`${
                      hasNotification ? 'md:block' : 'hidden'
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
                  hasNotification ? 'block' : 'hidden'
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
        hasNotification={hasNotification}
        isOpen={showSidebar}
        onClose={handleCloseMenu}
      />
    </div>
  );
};

export default Navbar;
