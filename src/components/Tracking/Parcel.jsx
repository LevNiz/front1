import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FetchParcels } from '../../api/parcels';
import jwt_decode from 'jwt-decode';
import { ContentLoading } from '../../helpers/Loader/Loader';
import nounBox from './../../assets/icons/noun-box.svg';
import parcelCar from './../../assets/images/parcel-car.svg';
import parcelIcon from './../../assets/images/parcel-icon.png';

const Parcel = () => {
  const { parcels, loading, error } = useSelector((state) => state?.parcels);
  const userToken = useSelector((state) => state?.user?.user?.access);
  const decoded = jwt_decode(userToken);
  const dispatch = useDispatch();

  const userParcels = parcels?.filter(
    (parcel) => parcel?.client?.id === decoded?.user_id
  );

  useEffect(() => {
    (async () => {
      await FetchParcels(dispatch);
    })();
  }, []);

  return loading ? (
    <ContentLoading />
  ) : error ? (
    <div
      className='bg-red-100 border text-center w-max mx-auto border-red-400 text-red-700 px-4 py-3 rounded relative'
      role='alert'
    >
      <strong className='font-bold'>Ошибка! </strong>
      <span className='block sm:inline'>
        К сожалению, ничего не найдено или произошла ошибка. Пожалуйста,
        попробуйте снова позже.
      </span>
    </div>
  ) : (
    <>
      {userParcels?.map((el, index) => (
        <NavLink
          to={`${el?.id}`}
          key={index}
          className='w-full shadow-[0px_15px_30px_0px_rgba(204,_204,_204,_0.40)] hover:shadow-[0px_20px_30px_0px_rgba(204,_204,_204,_0.90)] duration-150 rounded-[18px] p-4 md:p-8'
        >
          <div className='flex justify-between items-center'>
            <div className='flex items-center'>
              <img className='lg:block hidden' src={nounBox} alt='*' />
              <h4 className='text-lg md:text-2xl font-medium lg:ml-4'>
                {el?.orderNumber ? el?.orderNumber : 'Не указано'}
              </h4>
            </div>
            <div className='sm:max-w-[140px] sm:w-full md:min-h-[50px] rounded-xl md:rounded-[18px] flex justify-center items-center text-xs font-medium bg-colGreen px-4 py-2 break-all'>
              {el?.status == 'done'
                ? 'Готово'
                : el?.status == 'on_way'
                ? 'В пути'
                : el?.status == 'arrived'
                ? 'Получено'
                : el?.status == 'created'
                ? 'Создан'
                : 'Не указано'}
            </div>
          </div>
          <div className='flex justify-between pt-8'>
            <div className='max-w-[33%] break-all'>
              <span className='text-colGray2 text-xs sm:text-sm md:text-lg'>
                Отправитель
              </span>
              <h4 className='text-xs sm:text-base md:text-xl font-medium mt-2'>
                {el?.senderName ? el?.senderName : 'Не указано'}
              </h4>
            </div>
            <div className='max-w-[33%] break-all'>
              <span className='text-colGray2 text-xs sm:text-sm md:text-lg'>
                Дата доставки
              </span>
              <h4 className='text-xs sm:text-base md:text-xl font-medium mt-2'>
                {el?.dateArrived ? el?.dateArrived : 'Не указано'}
              </h4>
            </div>
            <div className='max-w-[33%] break-all'>
              <span className='text-colGray2 text-xs sm:text-sm md:text-lg'>
                Получатель
              </span>
              <h4 className='text-xs sm:text-base md:text-xl font-medium mt-2'>
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
    </>
  );
};

export default Parcel;
