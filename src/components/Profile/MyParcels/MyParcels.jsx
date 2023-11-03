import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import {
  FetchSavedParcels,
  fetchSearchSavedParcels,
  fetchSortSavedParcels,
} from '../../../api/parcels';
import { ContentLoading } from '../../../helpers/Loader/Loader';
import { ErrorServer } from '../../../helpers/Errors/ErrorServer';
import { ErrorEmpty } from '../../../helpers/Errors/ErrorEmpty';
import ParcelItem from './ParcelItem';
import FilterParcel from './FilterParcel';
import sort from './../../../assets/icons/sort.svg';
import search from './../../../assets/icons/search.svg';

const MyParcels = () => {
  const { savedParcels, loading, error } = useSelector(
    (state) => state?.parcels
  );
  const userID = useSelector((state) => state?.user?.userID);
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
    await fetchSearchSavedParcels(data.orderNumber, userID, dispatch);
  };

  const handleSort = async (param) => {
    await fetchSortSavedParcels(param, userID, dispatch);
  };

  useEffect(() => {
    (async () => {
      await FetchSavedParcels(dispatch, userID);
    })();
  }, [dispatch, userID]);

  return (
    <div className='py-5 sm:p-3 md:p-4 w-full overflow-hidden'>
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
        <ContentLoading extraStyle='350px' />
      ) : error ? (
        <ErrorServer />
      ) : savedParcels?.length ? (
        <>
          {savedParcels?.map((el) => (
            <ParcelItem key={el?.id} parcel={el} />
          ))}
        </>
      ) : (
        <ErrorEmpty
          title='По вашему запросу ничего не нашли.'
          desc='Здесь будут ваши посылки'
        />
      )}
    </div>
  );
};

export default MyParcels;
