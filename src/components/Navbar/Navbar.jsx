import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import logo from './../../assets/images/header-logo.svg';
import userImg from './../../assets/icons/user.svg';
import notification from './../../assets/icons/notification.svg';

const Navbar = () => {
  const [loginModal, setLoginModal] = useState(false);
  const modalRef = useRef();
  const user = localStorage.getItem('accessToken');

  const handleOutSideModal = (e) => {
    if (!modalRef.current.contains(e.target)) {
      setLoginModal(false);
    }
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

  const { pathname } = useLocation();

  return (
    <>
      <header className='bg-black py-4 md:py-2 md:sticky top-0 z-[99999]'>
        <div
          className={`container flex ${
            pathname === '/profile/notifications'
              ? 'justify-between'
              : pathname === '/depots'
              ? 'justify-between'
              : 'justify-center'
          } md:justify-between items-center`}
        >
          <NavLink to='/'>
            <img className='w-[120px] sm:w-auto' src={logo} alt='*' />
          </NavLink>
          <div className='md:hidden text-white'>
            {pathname === '/profile/notifications'
              ? 'Уведомления'
              : pathname === '/depots'
              ? 'Наши склады'
              : ''}
          </div>
          <ul className='hidden md:flex space-x-5 items-center text-white navbar'>
            <li>
              <NavLink to='/'>Главная</NavLink>
            </li>
            <li>
              <NavLink to='tracking'>Трекинг посылок</NavLink>
            </li>
            <li>
              <NavLink to='depots'>Наши склады</NavLink>
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
    </>
  );
};

export default Navbar;
