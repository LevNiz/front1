import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BuyRequestItem from './BuyRequestItem';
import {
  FetchBuyRequests,
  fetchBuyRequestsNextPage,
} from '../../../api/buyRequests';
import { ContentLoading } from '../../../helpers/Loader/Loader';
import { ErrorServer } from '../../../helpers/Errors/ErrorServer';
import { ErrorEmpty } from '../../../helpers/Errors/ErrorEmpty';
import { useInView } from 'react-intersection-observer';

const BuyRequest = () => {
  const { userID } = useSelector((state) => state?.user);
  const { buyRequests, loading, error } = useSelector(
    (state) => state?.buyRequests
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [ref, inView] = useInView();

  const [scrollLoading, setScrollLoading] = useState(false);
  const [nextPage, setNextPage] = useState(null);

  useEffect(() => {
    (async () => {
      const { data } = await FetchBuyRequests(dispatch, userID);
      setNextPage(data?.next);
    })();
  }, [dispatch, userID]);

  const handleIntersection = async () => {
    if (nextPage) {
      setScrollLoading(true);
      const { data } = await fetchBuyRequestsNextPage(
        dispatch,
        nextPage,
        buyRequests
      );
      if (data?.next) {
        setNextPage(data?.next);
        setScrollLoading(false);
      } else {
        setScrollLoading(false);
        setNextPage(null);
      }
    }
  };

  useEffect(() => {
    if (inView) {
      handleIntersection();
    }
  }, [inView]);

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
        <>
          <div className='py-4 grid ld:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-5'>
            {buyRequests?.map((buyRequest) => (
              <BuyRequestItem key={buyRequest?.id} data={buyRequest} />
            ))}
          </div>
          {!loading && (
            <div ref={ref} className='p-1'>
              {scrollLoading && <ContentLoading />}
            </div>
          )}
        </>
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
