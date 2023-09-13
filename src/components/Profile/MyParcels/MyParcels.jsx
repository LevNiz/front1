import sort from './../../../assets/icons/sort.svg';
import search from './../../../assets/icons/search.svg';
import errorImg from './../../../assets/images/error.svg';
import FilterParcel from './FilterParcel';
import { useEffect, useState } from 'react';
import ParcelItem from './ParcelItem';
import { NavLink } from 'react-router-dom';
import notFound from './../../../assets/images/404.svg';
import { useDispatch, useSelector } from 'react-redux';
import { ContentLoading } from '../../../helpers/Loader/Loader';
import {
  FetchParcels,
  fetchSortMyParcels,
  fetchSearchMyParcels,
} from '../../../api/parcels';
import jwt_decode from 'jwt-decode';
import { useForm } from 'react-hook-form';

const MyParcels = () => {
  const { parcels, loading, error } = useSelector((state) => state?.parcels);
  const token = useSelector((state) => state?.user?.user?.access);
  const decoded = jwt_decode(token);
  const dispatch = useDispatch();

  const [isFilterModalOpen, setFilterModalOpen] = useState(false);

  const openFilterModal = (e) => {
    e.preventDefault();
    setFilterModalOpen(true);
  };

  const closeFilterModal = () => {
    setFilterModalOpen(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await fetchSearchMyParcels(data.orderNumber, decoded?.user_id, dispatch);
  };

  const handleSort = async (param) => {
    await fetchSortMyParcels(param, decoded?.user_id, dispatch);
  };

  useEffect(() => {
    (async () => {
      await FetchParcels(dispatch, decoded?.user_id);
    })();
  }, [dispatch, decoded?.user_id]);

  return (
    <div className='py-5 sm:pl-3 md:pl-8 w-full overflow-hidden'>
      <form onSubmit={handleSubmit(onSubmit)} className='lg:flex'>
        <div className='w-full'>
          <div className='flex border border-colGray h-[50px] rounded-[10px] p-1 w-full'>
            <div className='flex justify-center items-center ml-2 cursor-pointer'>
              <img src={search} alt='*' />
            </div>
            <input
              className='px-2 text-sm sm:text-base w-full focus:outline-none'
              placeholder='Поиск по номеру посылки...'
              {...register('orderNumber', {
                required: 'Введите номер вашей посылки!',
              })}
            />
            <div
              className='flex justify-center items-center mr-2 cursor-pointer'
              onClick={(e) => openFilterModal(e)}
            >
              <img src={sort} alt='*' />
            </div>
          </div>
          {errors?.orderNumber && (
            <p className='text-red-500 mt-3 text-sm'>
              {errors?.orderNumber?.message || 'Error!'}
            </p>
          )}
        </div>
        <button
          className='lg:max-w-[255px] mt-3 lg:mt-0 lg:ml-3 w-full bg-black h-[50px] font-semibold text-white rounded-[10px] hover:opacity-80 duration-150'
          type='submit'
        >
          Поиск
        </button>
      </form>
      <div className='relative'>
        <FilterParcel isOpen={isFilterModalOpen} onClose={closeFilterModal} />
      </div>
      <div className='scrollable flex relative space-x-3 items-center overflow-x-scroll lg:overflow-x-hidden mt-8 mb-5 pb-3'>
        <div
          onClick={() => handleSort('')}
          className='py-2 sm:py-[10px] text-sm min-w-[120px] lg:min-w-0 md:px-2 lg:px-6 text-center cursor-pointer rounded-[50px] bg-black text-white'
        >
          Все
        </div>
        <div
          onClick={() => handleSort('created')}
          className='py-2 sm:py-[10px] text-sm min-w-[120px] lg:min-w-0 md:px-2 lg:px-6 text-center cursor-pointer rounded-[50px] bg-colPurple2'
        >
          Создан
        </div>
        <div
          onClick={() => handleSort('on_way')}
          className='py-2 sm:py-[10px] text-sm min-w-[120px] lg:min-w-0 md:px-2 lg:px-6 text-center cursor-pointer rounded-[50px] bg-colGreen2'
        >
          В пути
        </div>
        <div
          onClick={() => handleSort('arrived')}
          className='py-2 sm:py-[10px] text-sm min-w-[120px] lg:min-w-0 md:px-2 lg:px-6 text-center cursor-pointer rounded-[50px] bg-colBlue'
        >
          Полученные
        </div>
        <div
          onClick={() => handleSort('done')}
          className='py-2 sm:py-[10px] text-sm min-w-[120px] lg:min-w-0 md:px-2 lg:px-6 text-center cursor-pointer rounded-[50px] bg-colOrange'
        >
          Завершен
        </div>
      </div>
      {loading ? (
        <ContentLoading extraStyle='70vh' />
      ) : error ? (
        <div className='flex justify-center items-center w-full pt-10 sm:pt-24'>
          <div>
            <img className='mx-auto w-28 sm:w-32' src={errorImg} alt='*' />
            <h4 className='text-2xl font-medium py-6 text-center'>
              Произошла ошибка, повторите попытку позже!
            </h4>
            <NavLink
              to='/'
              className='max-w-[255px] mx-auto w-full flex sm:hidden justify-center items-center bg-black h-[48px] font-medium text-white rounded-[10px] hover:opacity-80 duration-150'
            >
              Перейти на главную
            </NavLink>
          </div>
        </div>
      ) : parcels?.length ? (
        <>
          {parcels?.map((el, index) => (
            <ParcelItem key={index} parcel={el} />
          ))}
        </>
      ) : (
        <div className='flex justify-center items-center w-full min-h-[380px]'>
          <div>
            <img className='mx-auto' src={notFound} alt='*' />
            <h4 className='text-2xl font-medium py-6 text-center'>
              К сожалению ничего не нашли...
            </h4>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyParcels;
