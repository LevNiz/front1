import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import MobileMenu from './MobileMenu';
import logo from './../../assets/gb-shop/icons/gb-shop-logo.svg';
import userIcon from './../../assets/gb-shop/icons/user.svg';
import favorite from './../../assets/gb-shop/icons/favorite.svg';
import basket from './../../assets/gb-shop/icons/basket.svg';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBasketData } from '../../api/gb-shop/basket';

const GBShopNavbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const { cartItems } = useSelector((state) => state?.cartItems);
  const { userID } = useSelector((state) => state?.user);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const user = localStorage.getItem('accessToken');

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

  useEffect(() => {
    const unsubscribe = fetchBasketData(userID, dispatch);
    return () => unsubscribe();
  }, [userID, dispatch]);

  return (
    <div className='relative'>
      <header
        className={`${
          scrolling ? '-translate-y-full' : 'translate-y-0'
        } py-2 fixed bg-white top-0 w-full transition-transform duration-300 ease-in-out z-[999999] shadow-[0px_10px_20px_0px_rgba(204,_204,_204,_0.40)]`}
      >
        <div className='container flex justify-between items-center'>
          <div className='flex items-center'>
            <NavLink to='/gb-shop'>
              <img
                className='w-[120px] mm:w-[140px] lg:w-auto'
                src={logo}
                alt='*'
              />
            </NavLink>
            <button className='flex justify-center items-center rounded-md bg-colYellow ml-7 px-3 py-2 space-x-3 hover:opacity-80 duration-150'>
              <div className='flex flex-col space-y-1 w-6 cursor-pointer'>
                <span className='w-full h-[2px] rounded-md bg-black'></span>
                <span className='w-full h-[2px] rounded-md bg-black'></span>
                <span className='w-full h-[2px] rounded-md bg-black'></span>
              </div>
              <p className='text-sm font-ubuntu'>Каталог</p>
            </button>
          </div>
          <div className='flex justify-end items-center'>
            {user ? (
              <ul className='flex items-center justify-end space-x-4'>
                <li className='relative'>
                  <NavLink to='/gb-shop/favorites'>
                    <img className='w-[27px] md:w-6' src={favorite} alt='*' />
                  </NavLink>
                </li>
                <li className='hidden sm:block relative'>
                  <span className='absolute -top-3 -right-3 bg-red-500 h-5 min-w-[20px] flex justify-center items-center text-xs text-white rounded-full px-1'>
                    {cartItems?.length > 99 ? '99+' : cartItems?.length}
                  </span>
                  <NavLink to='/gb-shop/basket'>
                    <img className='w-[27px] md:w-6' src={basket} alt='*' />
                  </NavLink>
                </li>
                <li className='relative'>
                  <NavLink to='profile/personal-data'>
                    <img className='w-[27px] md:w-6' src={userIcon} alt='*' />
                  </NavLink>
                </li>
              </ul>
            ) : (
              <NavLink
                className='font-medium hover:opacity-80 duration-150'
                to='/auth/sign-in'
              >
                Войти
              </NavLink>
            )}
            <div
              onClick={() => setShowSidebar(true)}
              className='flex flex-col space-y-[7px] w-8 cursor-pointer md:hidden ml-5 relative'
            >
              <span className='w-full h-[2.5px] rounded-md bg-colYellow'></span>
              <span className='w-full h-[2.5px] rounded-md bg-colYellow'></span>
              <span className='w-full h-[2.5px] rounded-md bg-colYellow'></span>
            </div>
          </div>
        </div>
      </header>
      <MobileMenu isOpen={showSidebar} onClose={handleCloseMenu} />
    </div>
  );
};

export default GBShopNavbar;
