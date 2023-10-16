import { useEffect } from 'react';
import { OrderDeliveryItem } from '../../components';
import parcelSvg from './../../assets/icons/service3.svg';
import { scrollToTop } from '../../helpers/ScrollToTop/scrollToTop';

const OrderDelivery = () => {
  
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className='py-24 content min-h-[720px]'>
      <div className='flex justify-center items-center pt-5 pb-12'>
        <h1 className='text-3xl font-medium text-center'>Оформление заявки</h1>
        <img className='w-9 ml-2' src={parcelSvg} alt='*' />
      </div>
      <OrderDeliveryItem />
    </div>
  );
};

export default OrderDelivery;
