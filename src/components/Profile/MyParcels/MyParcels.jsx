import sort from './../../../assets/icons/sort.svg';
import search from './../../../assets/icons/search.svg';
import FilterParcel from './FilterParcel';
import { useState } from 'react';
import ParcelItem from './ParcelItem';
import { parcel } from './../../../constants/parcelData';
import { NavLink } from 'react-router-dom';
import illustration from './../../../assets/images/illustration.png';

const MyParcels = () => {
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);

  const openFilterModal = (e) => {
    e.preventDefault();
    setFilterModalOpen(true);
  };

  const closeFilterModal = () => {
    setFilterModalOpen(false);
  };

  return (
    <div className='py-5 pl-3 md:pl-8 w-full overflow-hidden'>
      {parcel?.length > 0 ? (
        <>
          <form className='lg:flex'>
            <div className='flex border border-colGray h-[50px] rounded-[10px] p-1 w-full'>
              <div className='flex justify-center items-center ml-2 cursor-pointer'>
                <img src={search} alt='*' />
              </div>
              <input
                className='px-2 text-sm sm:text-base w-full focus:outline-none'
                type='text'
                placeholder='Поиск по складам, странам...'
              />
              <div
                className='flex justify-center items-center mr-2 cursor-pointer'
                onClick={(e) => openFilterModal(e)}
              >
                <img src={sort} alt='*' />
              </div>
            </div>
            <button
              className='lg:max-w-[255px] mt-3 lg:mt-0 lg:ml-3 w-full bg-black h-[50px] font-semibold text-white rounded-[10px] hover:opacity-80 duration-150'
              type='submit'
            >
              Поиск
            </button>
          </form>
          <div className='relative'>
            <FilterParcel
              isOpen={isFilterModalOpen}
              onClose={closeFilterModal}
            />
          </div>
          <div className='scrollable flex relative space-x-3 items-center overflow-x-scroll lg:overflow-x-hidden mt-8 pb-3'>
            <div className='py-2 sm:py-[10px] text-sm min-w-[180px] lg:min-w-0 md:px-6 text-center cursor-pointer rounded-[50px] bg-black text-white'>
              Все
            </div>
            <div className='py-2 sm:py-[10px] text-sm min-w-[150px] lg:min-w-0 md:px-6 text-center cursor-pointer rounded-[50px] bg-colPurple2'>
              Создан
            </div>
            <div className='py-2 sm:py-[10px] text-sm min-w-[150px] lg:min-w-0 md:px-6 text-center cursor-pointer rounded-[50px] bg-colGreen2'>
              В пути
            </div>
            <div className='py-2 sm:py-[10px] text-sm min-w-[150px] lg:min-w-0 md:px-6 text-center cursor-pointer rounded-[50px] bg-colBlue'>
              Готов к выдаче
            </div>
            <div className='py-2 sm:py-[10px] text-sm min-w-[150px] lg:min-w-0 md:px-6 text-center cursor-pointer rounded-[50px] bg-colOrange'>
              Завершен
            </div>
          </div>
          <ParcelItem parcel={parcel} />
        </>
      ) : (
        <div className='flex justify-center items-center w-full'>
          <div>
            <img className='mx-auto' src={illustration} alt='*' />
            <h4 className='text-2xl font-semibold py-12'>
              У вас еще нет данных
            </h4>
            <NavLink
              to='/'
              className='max-w-[255px] mx-auto w-full flex justify-center items-center bg-black h-[48px] font-medium text-white rounded-[10px] hover:opacity-80 duration-150'
              type='submit'
            >
              Перейти на главную
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyParcels;
