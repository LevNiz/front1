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
  }, []);

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
              className='shadow-md relative flex mm:block rounded-xl overflow-hidden'
            >
              <div className='bg-gray-100 p-2 sm:py-6 min-w-[90px] ss:min-w-[110px] sm:w-[25%] mm:w-auto flex items-center'>
                <div className='w-16 ss:w-20 sm:w-24 min-w-[64px] ss:min-w-[80px] sm:min-w-[96px] h-16 ss:h-20 sm:h-24 rounded-full overflow-hidden mx-auto border-2 border-colYellow p-[2px]'>
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
              <div className='p-3 sm:py-5 sm:px-4 mm:text-center w-[75%] mm:w-auto'>
                <div className='flex mm:justify-center items-center'>
                  <h3 className='font-medium sm:text-xl mr-1'>
                    {el?.fullname || 'Не указана'}
                  </h3>
                  <img className='w-8' src={instaTick} alt='*' />
                </div>
                <div className='flex mm:justify-center my-2 mm:my-0 items-center space-x-1 mm:absolute top-2 lg:top-3 right-3'>
                  <img className='w-4' src={star} alt='*' />
                  <img className='w-4' src={star} alt='*' />
                  <img className='w-4' src={star} alt='*' />
                  <img className='w-4' src={star} alt='*' />
                  <img className='w-4' src={star} alt='*' />
                </div>
                <div className='opacity-80 text-sm mt-[2px] line-clamp-1 break-all'>
                  {el?.countries &&
                    el?.countries?.map((country) => country?.nameRu).join(', ')}
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
