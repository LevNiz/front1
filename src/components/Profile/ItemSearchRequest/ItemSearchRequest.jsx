import { useEffect } from 'react';
import ItemSearchRequestCard from './ItemSearchRequestCard';
import { fetchSearchRequest } from '../../../api/searchRequest';
import { useDispatch, useSelector } from 'react-redux';
import { ContentLoading } from '../../../helpers/Loader/Loader';
import { ErrorServer } from '../../../helpers/Errors/ErrorServer';
import { ErrorEmpty } from '../../../helpers/Errors/ErrorEmpty';
import { useNavigate } from 'react-router-dom';

const ItemSearchRequest = () => {
  const { userID } = useSelector((state) => state?.user);
  const { loading, error, searchRequests } = useSelector(
    (state) => state?.searchRequests
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      await fetchSearchRequest(dispatch, userID);
    })();
  }, [dispatch, userID]);

  return (
    <div className='w-full pt-5 md:p-4'>
      <div className='flex justify-between items-center mb-5'>
        <h3 className='ss:text-xl sm:font-medium pr-3'>
          Заявки на поиск товара
        </h3>
        <button
          onClick={() => navigate('new')}
          className='bg-black text-white py-2 ss:py-[10px] min-w-[105px] px-1 sm:px-5 font-medium rounded-md hover:opacity-70 duration-100 text-xs sm:text-sm'
        >
          Новый запрос
        </button>
      </div>
      {loading ? (
        <ContentLoading extraStyle='480px' />
      ) : error ? (
        <ErrorServer />
      ) : searchRequests?.length ? (
        <div className='py-4 grid ld:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4'>
          {searchRequests?.map((el) => (
            <ItemSearchRequestCard key={el?.id} el={el} />
          ))}
        </div>
      ) : (
        <ErrorEmpty
          title='К сожалению, нет заявок.'
          desc='Здесь будут ваши заявки на поиск товара.'
        />
      )}
    </div>
  );
};

export default ItemSearchRequest;
