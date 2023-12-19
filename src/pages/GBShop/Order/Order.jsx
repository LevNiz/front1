import { useEffect } from 'react';
import { OrderDetail } from '../../../components';
import { scrollToTop } from '../../../helpers/ScrollToTop/scrollToTop';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Order = () => {
  const { user } = useSelector((state) => state?.user);

  useEffect(() => {
    scrollToTop();
  }, []);

  return user ? (
    <div className='content py-20'>
      <h3 className='font-bold font-ubuntu px-5 py-3 text-[#030303] text-3xl bg-[#FBFBFB] mt-5'>
        Оформить заказ
      </h3>
      <OrderDetail />
    </div>
  ) : (
    <Navigate to='/auth/sign-in' />
  );
};

export default Order;
