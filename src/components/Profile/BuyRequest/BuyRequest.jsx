import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BuyRequestItem from './BuyRequestItem';
import { FetchBuyRequests } from '../../../api/buyRequests';
import { ContentLoading } from '../../../helpers/Loader/Loader';
import { ErrorServer } from '../../../helpers/Errors/ErrorServer';
import { ErrorEmpty } from '../../../helpers/Errors/ErrorEmpty';

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
  }, [dispatch, userID]);

  return (
    <div className='w-full pt-5 md:p-4'>
      <div className='flex justify-between items-center pb-5'>
        <h3 className='ss:text-xl font-medium pr-3'>
          Заявки на покупку товара
        </h3>
        <button
          onClick={() => navigate('new')}
          className='bg-black text-white py-2 min-w-[98px] ss:py-[10px] px-1 sm:px-5 font-medium rounded-md hover:opacity-70 duration-100 text-xs sm:text-sm'
        >
          Новый заказ
        </button>
      </div>
      {loading ? (
        <ContentLoading extraStyle='480px' />
      ) : error ? (
        <ErrorServer />
      ) : buyRequests?.length ? (
        <div className='py-4 grid ld:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-5'>
          {buyRequests?.map((buyRequest) => (
            <BuyRequestItem key={buyRequest?.id} data={buyRequest} />
          ))}
        </div>
      ) : (
        <ErrorEmpty
          title='К сожалению, нет заявок.'
          desc='Здесь будут ваши заявки на покупки товара.'
        />
      )}
    </div>
  );
};

export default BuyRequest;
