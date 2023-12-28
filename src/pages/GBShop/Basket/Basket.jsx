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
    <div className='py-20 md:py-24 min-h-[991px] content'>
      <div className='bg-[#FBFBFB] py-1 lg:py-2 px-3 lg:px-5 my-4'>
        <h3 className='font-bold font-ubuntu text-[#030303] text-xl md:text-2xl lg:text-3xl'>
          Корзина
        </h3>
      </div>
      <BasketInfo />
    </div>
  ) : (
    <Navigate to='/auth/sign-in' />
  );
};

export default Basket;
