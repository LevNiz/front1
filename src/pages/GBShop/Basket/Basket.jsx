import { useSelector } from 'react-redux';
import { BasketInfo } from '../../../components';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { scrollToTop } from '../../../helpers/ScrollToTop/scrollToTop';

const Basket = () => {
  const { user } = useSelector((state) => state?.user);

  useEffect(() => {
    scrollToTop();
  }, []);

  return user ? (
    <div className='py-24 min-h-[991px] content'>
      <h3 className='font-bold font-ubuntu px-5 py-3 text-[#030303] text-3xl bg-[#FBFBFB]'>
        Корзина
      </h3>
      <BasketInfo />
    </div>
  ) : (
    <Navigate to='/auth/sign-in' />
  );
};

export default Basket;
