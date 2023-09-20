import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FetchParcels, fetchSearchParcel } from '../../api/parcels';
import { ContentLoading } from '../../helpers/Loader/Loader';
import nounBox from './../../assets/icons/noun-box.svg';
import parcelCar from './../../assets/images/parcel-car.svg';
import rulesImg from './../../assets/images/rules.svg';
import notFound from './../../assets/images/404.svg';
import errorImg from './../../assets/images/error.svg';
import parcelIcon from './../../assets/images/parcel-icon.png';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

const Parcel = () => {
  const {
    parcels = [],
    loading,
    error,
  } = useSelector((state) => state?.parcels);
  const userID = useSelector((state) => state?.user?.userID);
  const dispatch = useDispatch();

  const [userParcels, setUserParcels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
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
      setIsSearched(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setUserParcels(parcels);
  }, [parcels]);

  useEffect(() => {
    (async () => {
      await FetchParcels(dispatch, userID);
    })();
  }, [dispatch, userID]);

  return (
    <>
      <div className='lg:flex items-center lg:my-6'>
        <div className='lg:max-w-[885px] w-full min-h-[190px] shadow-[rgba(204,_204,_204,_0.40)_0px_10px_20px_0px] rounded-md mx-auto px-4 py-4 sm:px-12 sm:py-6 bg-colYellow'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className='text-base sm:text-xl font-medium mb-8'>
              Введите ваш номер, чтобы найти вашу посылку
            </h3>
            <div className='sm:flex'>
              <div className='sm:max-w-[405px] w-full'>
                <input
                  className='w-full px-4 h-[42px] rounded-[10px] shadow-md text-base focus:outline-none'
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
                className='bg-black text-white w-full mt-4 sm:mt-0 sm:ml-5 h-[42px] font-medium rounded-lg hover:opacity-80 duration-100'
              >
                Отследить
              </button>
            </div>
          </form>
        </div>
        <div className='max-w-[380px] h-[130px] hidden rounded-[10px] lg:flex justify-center items-center w-full bg-colPurple mt-0 py-4 px-6 lg:ml-10 text-center'>
          <img src={rulesImg} alt='*' />
          <p className='text-xl font-medium text-white ml-3'>
            Инструкция к оформлению нового заказа
          </p>
        </div>
      </div>
      {isLoading ? (
        <ContentLoading extraStyle='320px' />
      ) : isSearched && userParcels?.length < 1 ? (
        <div className='flex flex-col justify-center items-center min-h-[400px]'>
          <div className='py-10'>
            <img className='mx-auto' src={notFound} alt='*' />
            <h4 className='text-center font-medium mt-5 text-xl'>
              По вашему запросу ничего не нашли...
            </h4>
          </div>
        </div>
      ) : loading ? (
        <ContentLoading extraStyle='320px' />
      ) : userParcels?.length < 1 ? (
        <div className='flex flex-col justify-center items-center min-h-[400px]'>
          <div className='py-10'>
            <img className='mx-auto' src={notFound} alt='*' />
            <h4 className='text-center font-medium mt-5 text-xl'>
              У Вас нет посылок...
            </h4>
          </div>
        </div>
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
      ) : (
        <div className='flex justify-center my-6 sm:my-16'>
          <div className='max-w-[991px] w-full flex flex-col space-y-8'>
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
          </div>
        </div>
      )}
    </>
  );
};

export default Parcel;
