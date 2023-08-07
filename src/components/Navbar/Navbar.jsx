import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from './../../assets/icons/logo.svg';

const Navbar = () => {
  const [loginModal, setLoginModal] = useState(false);
  const modalRef = useRef();

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

  return (
    <header className='bg-black py-2 relative'>
      <div className='container flex justify-between items-center'>
        <NavLink to='/'>
          <img src={logo} alt='*' />
        </NavLink>
        <ul className='flex space-x-5 items-center text-white navbar'>
          <li>
            <NavLink to='/'>Главная</NavLink>
          </li>
          <li>
            <NavLink to='tracking'>Трекинг посылок</NavLink>
          </li>
          <li>
            <NavLink to='warehouses'>Наши склады</NavLink>
          </li>
        </ul>
        <button
          onClick={() => setLoginModal(true)}
          className='bg-colYellow w-24 h-10 rounded-lg hover:bg-colYellowHover duration-100'
        >
          Войти
        </button>
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
            <NavLink className='w-full p-3 bg-black text-white rounded-lg text-center hover:opacity-80 duration-100'>
              Войти
            </NavLink>
            <NavLink className='w-full p-3 bg-black text-white rounded-lg text-center hover:opacity-80 duration-100'>
              Зарегистрироваться
            </NavLink>
          </div>
        </div>
      ) : (
        ''
      )}
    </header>
  );
};

export default Navbar;
