import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApplications } from '../../api/applications';
import { ErrorEmpty } from '../../helpers/Errors/ErrorEmpty';
import { ErrorServer } from '../../helpers/Errors/ErrorServer';
import { ContentLoading } from '../../helpers/Loader/Loader';
import parcelCar from './../../assets/images/parcel-car.svg';

const ApplicationsItem = () => {
  const { userID } = useSelector((state) => state?.user);
  const { loading, error, applications } = useSelector(
    (state) => state?.applications
  );
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await fetchApplications(userID, dispatch);
    })();
  }, [dispatch, userID]);

  return (
    <div className='max-w-[991px] w-full flex flex-col space-y-8 mx-auto py-10'>
      {loading ? (
        <ContentLoading extraStyle='320px' />
      ) : error ? (
        <ErrorServer />
      ) : applications?.length ? (
        <>
          {applications?.map((el) => (
            <NavLink
              key={el?.id}
              // to=''
              onClick={() => alert('Детальная страница уже совсем скоро!')}
              className='w-full bg-colBgGray2 rounded-[18px] p-4 md:p-6'
            >
              <div className='flex justify-between items-center'>
                <div className='ss:max-w-[auto] max-w-[80%] w-full'>
                  <h4 className='text-base sm:text-xl font-medium whitespace-nowrap text-ellipsis overflow-hidden'>
                    Заявка {el?.toCountry?.code + el?.toCity?.code + el?.id}
                  </h4>
                </div>
                <div className='max-w-[20%] sm:max-w-[auto] rounded-lg md:rounded-2xl flex justify-center sm:px-5 sm:py-2 px-2 py-[2px] bg-gray-600'>
                  <span className='text-[9px] text-white sm:text-xs sm:font-medium text-ellipsis overflow-hidden whitespace-nowrap'>
                    В ожидании
                  </span>
                </div>
              </div>
              <div className='flex justify-between pt-4'>
                <div className='max-w-[33%] break-all text-center'>
                  <span className='text-colGray2 text-xs sm:text-sm md:text-base'>
                    Откуда?
                  </span>
                  <h4 className='text-xs sm:text-base md:text-base font-medium mt-1 sm:mt-2'>
                    {el?.fromCity
                      ? el?.fromCity?.nameRu + ', ' + el?.fromCountry?.nameRu
                      : 'Не указано'}
                  </h4>
                </div>
                <div className='max-w-[33%] break-all text-center'>
                  <span className='text-colGray2 text-xs sm:text-sm md:text-base'>
                    Дата доставки
                  </span>
                  <h4 className='text-xs sm:text-base md:text-base font-medium mt-1 sm:mt-2'>
                    {el?.dateCreated
                      ? el?.dateCreated.split('T')[0]
                      : 'Не указано'}
                  </h4>
                </div>
                <div className='max-w-[33%] break-all text-center'>
                  <span className='text-colGray2 text-xs sm:text-sm md:text-base'>
                    Куда?
                  </span>
                  <h4 className='text-xs sm:text-sm md:text-base font-medium mt-1 sm:mt-2'>
                    {el?.toCity
                      ? el?.toCity?.nameRu + ', ' + el?.toCountry?.nameRu
                      : 'Не указано'}
                  </h4>
                </div>
              </div>
              <div className='md:flex justify-between items-center mt-4'>
                <div className='flex items-center'>
                  <div className='sm:min-h-[23px] min-h-[18px] min-w-[18px] sm:min-w-[23px] p-2 rounded-full bg-colYellow'></div>
                  <span className='bg-colYellow h-[2px] w-full md:w-[90px]'></span>
                  <div className='p-2 rounded-full bg-colYellow'>
                    <img
                      className='min-w-[18px] sm:min-w-[22px]'
                      src={parcelCar}
                      alt='*'
                    />
                  </div>
                  <span className='bg-black h-[2px] w-full md:w-[90px]'></span>
                  <div className='sm:min-h-[23px] min-h-[18px] min-w-[18px] sm:min-w-[23px] p-2 rounded-full bg-black'></div>
                </div>
              </div>
            </NavLink>
          ))}
        </>
      ) : (
        <ErrorEmpty
          title='К сожалению, нет активных заявок.'
          desc='Здесь будут ваши заявки.'
        />
      )}
    </div>
  );
};

export default ApplicationsItem;
