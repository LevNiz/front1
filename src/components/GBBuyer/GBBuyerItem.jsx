import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBuyers } from '../../api/buyer';
import noImg from '../../assets/images/no-ava.jpeg';
import instaTick from '../../assets/icons/insta-tick.png';
import star from '../../assets/icons/star.png';
import inCorrectImg from '../../assets/images/404.svg';
import errorImg from '../../assets/images/error.svg';
import { ContentLoading } from '../../helpers/Loader/Loader';
import { NavLink } from 'react-router-dom';
import { fetchWebsites } from '../../api/websites';

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
                    src={el?.avatar ? el?.avatar : noImg}
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
        <div className='text-center max-w-[320px] min-h-[218px] mx-auto pt-20'>
          <img className='mx-auto mb-5' src={inCorrectImg} alt='*' />
          <h3 className='text-xl font-medium max-w-[260px] mx-auto'>
            К сожалению, здесь пусто!
          </h3>
          <p className='text-sm opacity-75 max-w-[260px] mx-auto my-2 pb-3'>
            По вашему запросу ничего не нашли.
          </p>
        </div>
      )}
    </>
  );
};

export default GBBuyerItem;
