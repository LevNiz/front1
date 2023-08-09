import sort from './../../../assets/icons/sort.svg';
import search from './../../../assets/icons/search.svg';
import FilterParcel from './FilterParcel';
import { useState } from 'react';
import ParcelItem from './ParcelItem';

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
    <div className='py-5 pl-8 w-full'>
      <form className='flex'>
        <div className='flex border border-colGray rounded-[10px] p-1 w-full'>
          <div className='flex justify-center items-center ml-2 cursor-pointer'>
            <img src={search} alt='*' />
          </div>
          <input
            className='px-2 w-full focus:outline-none'
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
          className='max-w-[255px] ml-3 w-full bg-black h-[50px] font-semibold text-white rounded-[10px] hover:opacity-80 duration-150'
          type='submit'
        >
          Поиск
        </button>
      </form>
      <div className='relative'>
        <FilterParcel isOpen={isFilterModalOpen} onClose={closeFilterModal} />
      </div>
      <div className='flex mt-8 space-x-3'>
        <div className='py-[10px] cursor-pointer px-[34px] rounded-[50px] bg-black text-white'>
          Все
        </div>
        <div className='py-[10px] cursor-pointer px-[34px] rounded-[50px] bg-colPurple2'>
          Создан
        </div>
        <div className='py-[10px] cursor-pointer px-[34px] rounded-[50px] bg-colGreen2'>
          В пути
        </div>
        <div className='py-[10px] cursor-pointer px-[34px] rounded-[50px] bg-colBlue'>
          Готов к выдаче
        </div>
        <div className='py-[10px] cursor-pointer px-[34px] rounded-[50px] bg-colOrange'>
          Завершен
        </div>
      </div>
      <ParcelItem />
    </div>
  );
};

export default MyParcels;
