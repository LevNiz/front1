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
