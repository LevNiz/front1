import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { parcelStatus } from '../../constants/statusData';
import {
  FetchParcels,
  fetchParcelsNextPage,
  fetchSearchParcel,
} from '../../api/parcels';
import { ContentLoading } from '../../helpers/Loader/Loader';
import { ErrorServer } from '../../helpers/Errors/ErrorServer';
import { ErrorEmpty } from '../../helpers/Errors/ErrorEmpty';
import { useInView } from 'react-intersection-observer';
import nounBox from './../../assets/icons/noun-box.svg';
import parcelCar from './../../assets/images/parcel-car.svg';
import parcelIcon from './../../assets/images/parcel-icon.png';

const Parcel = () => {
  const {
    parcels = [],
    loading,
    error,
  } = useSelector((state) => state?.parcels);
  const userID = useSelector((state) => state?.user?.userID);
  const dispatch = useDispatch();
  const [ref, inView] = useInView();

  const [userParcels, setUserParcels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [scrollLoading, setScrollLoading] = useState(false);
  const [nextPage, setNextPage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    const { success, parcelData } = await fetchSearchParcel(data.orderNumber);
    if (success) {
      setUserParcels(parcelData);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setUserParcels(parcels);
  }, [parcels]);

  useEffect(() => {
    (async () => {
      const { data } = await FetchParcels(dispatch, userID);
      if (data?.next) {
        setNextPage(data?.next);
      } else {
        setNextPage(null);
      }
    })();
  }, [dispatch, userID]);

  const handleIntersection = async () => {
    if (nextPage) {
      setScrollLoading(true);
      const { data } = await fetchParcelsNextPage(dispatch, nextPage, parcels);
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
    <>
      <div className='lg:flex items-center lg:my-6'>
        <div className='w-full min-h-[190px] shadow-[rgba(204,_204,_204,_0.40)_0px_10px_20px_0px] rounded-md mx-auto px-4 py-4 mm:px-12 mm:py-6 bg-colYellow'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className='text-base mm:text-xl font-medium mb-5 mm:mb-8'>
              Введите ваш номер, чтобы найти вашу посылку
            </h3>
            <div className='mm:flex'>
              <div className='w-full'>
                <input
                  className='w-full px-4 h-[44px] mm:h-12 rounded-[10px] shadow-md text-base focus:outline-none'
                  placeholder='Ваш номер'
                  {...register('orderNumber', {
                    required: 'Поле обязательно к заполнению!',
                  })}
                />
                {errors?.orderNumber && (
                  <p className='text-red-500 mt-3 text-sm'>
                    {errors?.orderNumber?.message || 'Error!'}
                  </p>
                )}
              </div>
              <button
                type='submit'
                className='bg-black text-white mm:max-w-sm w-full mt-4 mm:mt-0 mm:ml-5 h-[44px] mm:h-12 font-medium rounded-lg hover:opacity-80 duration-100'
              >
                Отследить
              </button>
            </div>
          </form>
        </div>
      </div>
      <h2 className='text-center font-medium text-2xl mt-10'>
        Мои текущие посылки
      </h2>
      {isLoading ? (
        <ContentLoading extraStyle='320px' />
      ) : error ? (
        <ErrorServer />
      ) : loading ? (
        <ContentLoading extraStyle='320px' />
      ) : userParcels?.length ? (
        <div className='my-6 sm:my-16'>
          <div className='max-w-[991px] mx-auto w-full flex flex-col space-y-8'>
            {userParcels?.map((el) => (
              <NavLink
                to={`${el?.id}`}
                key={el?.id}
                className='w-full shadow-[0px_15px_30px_0px_rgba(204,_204,_204,_0.40)] hover:shadow-[0px_20px_30px_0px_rgba(204,_204,_204,_0.90)] duration-150 rounded-[18px] p-4 md:p-8'
              >
                <span className='text-colGray2 text-xs sm:text-sm md:text-lg'>
                  Номер посылки
                </span>
                <div className='flex justify-between items-center mt-1'>
                  <div className='flex items-center ss:max-w-[auto] max-w-[80%] w-full'>
                    <img
                      className='lg:block hidden w-12'
                      src={nounBox}
                      alt='*'
                    />
                    <h4 className='text-base sm:text-2xl font-medium lg:ml-4 whitespace-nowrap text-ellipsis overflow-hidden'>
                      {el?.orderNumber ? `№ ${el?.orderNumber}` : 'Не указано'}
                    </h4>
                  </div>
                  <div
                    className={`max-w-[20%] sm:max-w-[auto] rounded-lg md:rounded-2xl flex justify-center sm:px-5 sm:py-2 px-2 py-[2px] ${
                      parcelStatus[el?.status]?.statusStyle
                    }`}
                  >
                    <span className='text-[9px] sm:text-xs sm:font-medium text-ellipsis overflow-hidden whitespace-nowrap'>
                      {parcelStatus[el?.status]?.name || 'Не указан'}
                    </span>
                  </div>
                </div>
                <div className='flex justify-between pt-8'>
                  <div className='max-w-[33%] break-all'>
                    <span className='text-colGray2 text-xs sm:text-sm md:text-lg'>
                      Отправитель
                    </span>
                    <h4 className='text-xs sm:text-base md:text-xl font-medium mt-1 sm:mt-2'>
                      {el?.senderName ? el?.senderName : 'Не указано'}
                    </h4>
                  </div>
                  <div className='max-w-[33%] break-all'>
                    <span className='text-colGray2 text-xs sm:text-sm md:text-lg'>
                      Дата доставки
                    </span>
                    <h4 className='text-xs sm:text-base md:text-xl font-medium mt-1 sm:mt-2'>
                      {el?.dateArrived ? el?.dateArrived : 'Не указано'}
                    </h4>
                  </div>
                  <div className='max-w-[33%] break-all'>
                    <span className='text-colGray2 text-xs sm:text-sm md:text-lg'>
                      Получатель
                    </span>
                    <h4 className='text-xs sm:text-base md:text-xl font-medium mt-1 sm:mt-2'>
                      {el?.receiverName ? el?.receiverName : 'Не указано'}
                    </h4>
                  </div>
                </div>
                <div className='md:flex justify-between items-center mt-8'>
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
                    <span className='bg-black h-[2px] w-full md:w-[90px]'></span>
                    <div className='sm:min-h-[23px] min-h-[18px] min-w-[18px] sm:min-w-[23px] p-2 rounded-full bg-black'></div>
                  </div>
                  <div className='sm:w-[45px] w-[25px] mt-3 sm:mt-0 ml-auto h-[25px] sm:h-[45px] overflow-hidden'>
                    <img
                      className='w-full h-full object-cover'
                      src={parcelIcon}
                      alt='*'
                    />
                  </div>
                </div>
              </NavLink>
            ))}
          </div>
          {!loading && (
            <div ref={ref} className='p-1'>
              {scrollLoading && <ContentLoading />}
            </div>
          )}
        </div>
      ) : (
        <ErrorEmpty
          title='Список пуст.'
          desc='По вашему запросу ничего не нашли.'
        />
      )}
    </>
  );
};

export default Parcel;
