import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from './../../assets/images/header-logo.svg';
import userImg from './../../assets/icons/user.svg';
import notification from './../../assets/icons/notification.svg';
import MobileMenu from './MobileMenu';

const Navbar = () => {
  const [loginModal, setLoginModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    setPrevScrollPos(currentScrollPos);
    setScrolling(prevScrollPos < currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

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
    if (loginModal) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [loginModal]);

  return (
    <>
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
          <div
            onClick={() => setShowSidebar(true)}
            className='flex flex-col w-9 cursor-pointer md:hidden'
          >
            <span className='w-1/2 h-[3px] rounded-sm bg-colYellow my-[3px]'></span>
            <span className='w-full h-[3px] rounded-sm bg-colYellow my-[3px]'></span>
            <span className='w-1/2 h-[3px] rounded-sm bg-colYellow my-[3px] ml-auto'></span>
          </div>
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
              <NavLink to='gb-buyer'>GB-Байер</NavLink>
            </li>
            <li>
              <NavLink to='gb-business'>GB-Бизнес</NavLink>
            </li>
          </ul>
          {user ? (
            <ul className='hidden md:flex items-center justify-end space-x-4'>
              <li>
                <NavLink to='profile/personal-data'>
                  <img src={userImg} alt='*' />
                </NavLink>
              </li>
              <li>
                <NavLink to='profile/notifications'>
                  <img src={notification} alt='*' />
                </NavLink>
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
        </div>
        {loginModal ? (
          <div
            onClick={(e) => handleOutSideModal(e)}
            className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 z-[99]'
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
      </header>
      <MobileMenu isOpen={showSidebar} onClose={handleCloseMenu} />
    </>
  );
};

export default Navbar;
