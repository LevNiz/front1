import { useEffect } from 'react';
import { OrderDetail } from '../../../components';
import { scrollToTop } from '../../../helpers/ScrollToTop/scrollToTop';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchAddresses } from '../../../api/addresses';

const Order = () => {
  const { userID } = useSelector((state) => state?.user);
  const dispatch = useDispatch();

  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    (async () => {
      await fetchAddresses(userID, dispatch);
    })();
  }, [dispatch, userID]);

  return userID ? (
    <div className='content py-20'>
      <div className='bg-[#FBFBFB] py-1 lg:py-2 px-3 lg:px-5 my-4'>
        <h3 className='font-bold font-ubuntu text-[#030303] text-xl md:text-2xl lg:text-3xl'>
          Оформить заказ
        </h3>
      </div>
      <OrderDetail />
    </div>
  ) : (
    <Navigate to='/auth/sign-in' />
  );
};

export default Order;
