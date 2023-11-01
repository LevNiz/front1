import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BuyRequestItem from './BuyRequestItem';
import { FetchBuyRequests } from '../../../api/buyRequests';
import { ContentLoading } from '../../../helpers/Loader/Loader';
import notFound from '../../../assets/images/404.svg';
import errorImg from '../../../assets/images/error.svg';

const BuyRequest = () => {
  const { userID } = useSelector((state) => state?.user);
  const { buyRequests, loading, error } = useSelector(
    (state) => state?.buyRequests
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await FetchBuyRequests(dispatch, userID);
    })();
  }, []);

  return (
    <div className='w-full pt-5 md:p-4'>
      <div className='flex justify-between items-center'>
        <h3 className='ss:text-xl sm:font-medium'>Заявки на покупку</h3>
        <button
          onClick={() => navigate('new')}
          className='bg-colYellow py-2 ss:py-[10px] px-3 sm:px-5 font-medium rounded-md hover:opacity-70 duration-100 text-xs sm:text-sm'
        >
          Новый заказ
        </button>
      </div>
      {loading ? (
        <ContentLoading extraStyle='480px' />
      ) : error ? (
        <div className='flex justify-center items-center w-full pt-10 sm:pt-24'>
          <div>
            <img className='mx-auto w-24 sm:w-40' src={errorImg} alt='*' />
            <h4 className='text-xl sm:text-2xl font-medium py-6 sm:py-12 text-center'>
              Произошла ошибка, повторите попытку позже!
            </h4>
            <NavLink
              to='/'
              className='max-w-[255px] mx-auto w-full flex justify-center items-center bg-black h-[48px] font-medium text-white rounded-[10px] hover:opacity-80 duration-150'
            >
              Перейти на главную
            </NavLink>
          </div>
        </div>
      ) : buyRequests?.length ? (
        <div className='py-4 grid ld:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-3'>
          {buyRequests?.map((buyRequest) => (
            <BuyRequestItem key={buyRequest?.id} data={buyRequest} />
          ))}
        </div>
      ) : (
        <div className='flex flex-col justify-center items-center min-h-[400px]'>
          <div className='text-center'>
            <img className='mx-auto' src={notFound} alt='*' />
            <h4 className='text-center font-medium mt-5 text-xl'>
              К сожалению, нет заявок.
            </h4>
            <p className='text-gray-400'>Здесь будут ваши заявки на покупки.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyRequest;
