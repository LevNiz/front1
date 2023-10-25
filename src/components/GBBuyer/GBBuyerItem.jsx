import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBuyers } from '../../api/buyer';
import noImg from '../../assets/images/no-ava.jpeg';

const GBBuyerItem = () => {
  const dispatch = useDispatch();
  const { loading, error, buyers } = useSelector((state) => state?.buyers);

  useEffect(() => {
    (async () => {
      fetchBuyers(dispatch);
    })();
  }, []);

  return (
    <div className='grid grid-cols-3 gap-6'>
      {buyers?.map((el) => (
        <div key={el?.id} className='shadow-md'>
          <div className='bg-gray-100 py-6'>
            <div className='w-20 min-w-[80px] h-20 rounded-full overflow-hidden mx-auto'>
              <img
                className='w-full h-full object-cover'
                src={el?.avatar ? el?.avatar :  noImg}
                alt='*'
              />
            </div>
          </div>
          <div className='py-5 px-4 text-center'>
            <h3 className='font-medium text-xl'>{el?.fullname || 'Не указана'}</h3>
            <p className='opacity-60 text-sm mt-[2px]'>Бишкек, Кыргызстан</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GBBuyerItem;
