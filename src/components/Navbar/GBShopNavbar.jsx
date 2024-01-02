import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import logo from './../../assets/gb-shop/icons/gb-shop-logo.svg';
import userIcon from './../../assets/gb-shop/icons/user.svg';
import favorite from './../../assets/gb-shop/icons/favorite.svg';
import basket from './../../assets/gb-shop/icons/basket.svg';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBasketData } from '../../api/gb-shop/basket';
import { fetchFavoriteItems } from '../../api/gb-shop/items';
import GBShopCatalog from './GBShopCatalog';

const GBShopNavbar = () => {
  const [scrolling, setScrolling] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [showSidebar, setShowSidebar] = useState(false);

  const { cartItems } = useSelector((state) => state?.cartItems);
  const { favItems } = useSelector((state) => state?.favItems);
  const { userID, user } = useSelector((state) => state?.user);
  const { pathname } = useLocation();
  const dispatch = useDispatch();

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

  useEffect(() => {
    const unsubscribe = fetchFavoriteItems(userID, dispatch);
    return () => unsubscribe();
  }, [userID, dispatch]);

  return (
    <div className='relative'>
      <header
        className={`${
          scrolling ? '-translate-y-full' : 'translate-y-0'
        } py-2 fixed bg-[#FBFBFB] top-0 w-full transition-transform duration-300 ease-in-out z-[999999] md:shadow-[0px_10px_20px_0px_rgba(204,_204,_204,_0.40)]`}
      >
        <div className='container flex justify-between items-center'>
          <div className='flex items-center'>
            <NavLink to='/gb-shop'>
              <img className='w-[64px] lg:w-auto' src={logo} alt='*' />
            </NavLink>
            <button
              onClick={() => setShowSidebar(true)}
              className='hidden sm:flex justify-center focus:outline-none items-center rounded-md bg-colYellow ml-3 sm:ml-7 px-3 py-2 space-x-3 hover:opacity-80 duration-150'
            >
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
                <li>
                  <NavLink className='relative' to='/gb-shop/favorites'>
                    <span className='absolute -top-3 -right-3 bg-red-500 h-5 min-w-[20px] flex justify-center items-center text-xs text-white rounded-full px-1'>
                      {favItems?.length > 99 ? '99+' : favItems?.length}
                    </span>
                    <img className='md:w-6' src={favorite} alt='*' />
                  </NavLink>
                </li>
                <li>
                  <NavLink className='relative' to='/gb-shop/basket'>
                    <span className='absolute -top-3 -right-3 bg-red-500 h-5 min-w-[20px] flex justify-center items-center text-xs text-white rounded-full px-1'>
                      {cartItems?.length > 99 ? '99+' : cartItems?.length}
                    </span>
                    <img className='md:w-6' src={basket} alt='*' />
                  </NavLink>
                </li>
                <li className='pl-1 sm:hidden'>
                  <div
                    onClick={() => setShowSidebar(true)}
                    className='flex flex-col space-y-[6px] w-6 cursor-pointer'
                  >
                    <span className='w-full h-[2px] rounded-md bg-black'></span>
                    <span className='w-full h-[2px] rounded-md bg-black'></span>
                    <span className='w-full h-[2px] rounded-md bg-black'></span>
                  </div>
                </li>
                <li className='relative'>
                  <NavLink to='profile/personal-data'>
                    <img className='md:w-6' src={userIcon} alt='*' />
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
          </div>
        </div>
      </header>
      <GBShopCatalog isOpen={showSidebar} onClose={handleCloseMenu} />
    </div>
  );
};

export default GBShopNavbar;
