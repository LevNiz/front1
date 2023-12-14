import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { ContentLoading } from '../../helpers/Loader/Loader';
import { fetchBuyers } from '../../api/buyer';
import { fetchWebsites } from '../../api/websites';
import noImg from '../../assets/images/no-ava.jpeg';
import instaTick from '../../assets/icons/insta-tick.png';
import star from '../../assets/icons/star.png';
import { ErrorServer } from '../../helpers/Errors/ErrorServer';
import { ErrorEmpty } from '../../helpers/Errors/ErrorEmpty';

const GBBuyerItem = () => {
  const dispatch = useDispatch();
  const { loading, error, buyers } = useSelector((state) => state?.buyers);

  useEffect(() => {
    (async () => {
      await fetchBuyers(dispatch);
      await fetchWebsites(dispatch);
    })();
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <ContentLoading extraStyle='380px' />
      ) : error ? (
        <ErrorServer />
      ) : buyers?.length ? (
        <div className='grid mm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {buyers?.map((el) => (
            <NavLink
              to={`${el?.id}`}
              key={el?.id}
              className='shadow-[0_4px_16px_#e9e9e9] hover:shadow-[0_4px_16px_#d9d9d9] duration-200 flex rounded-xl overflow-hidden p-2'
            >
              <div className='sm:py-4 min-w-[90px] ss:min-w-[110px] sm:w-[25%] mm:w-auto flex items-center'>
                <div className='w-20 ss:w-24 min-w-[80px] ss:min-w-[96px] h-20 ss:h-24 rounded-full overflow-hidden mx-auto p-[2px]'>
                  <img
                    className='w-full h-full object-cover rounded-full'
                    src={el?.avatar}
                    onError={(e) => {
                      (e.target.onError = null), (e.target.src = noImg);
                    }}
                    alt='*'
                  />
                </div>
              </div>
              <div className='p-3 sm:p-2 w-[75%]'>
                <div className='flex justify-between items-center'>
                  <h3 className='font-medium sm:text-lg mr-1 line-clamp-1 break-all'>
                    {el?.fullname || 'Не указана'}
                  </h3>
                  <img className='w-8' src={instaTick} alt='*' />
                </div>
                <div className='opacity-80 text-sm mt-[2px] line-clamp-1 break-all'>
                  {el?.countries &&
                    el?.countries?.map((country) => country?.nameRu).join(', ')}
                </div>
                <div className='flex my-2 items-center space-x-1'>
                  <img className='w-4' src={star} alt='*' />
                  <img className='w-4' src={star} alt='*' />
                  <img className='w-4' src={star} alt='*' />
                  <img className='w-4' src={star} alt='*' />
                  <img className='w-4' src={star} alt='*' />
                </div>
                <div className='opacity-60 text-xs mt-[2px] line-clamp-1 break-all'>
                  {el?.websites &&
                    el?.websites?.map((website) => website?.name).join(', ')}
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      ) : (
        <ErrorEmpty
          title='К сожалению, здесь пусто!'
          desc='По вашему запросу ничего не нашли.'
        />
      )}
    </>
  );
};

export default GBBuyerItem;
