import sort from './../../../assets/icons/sort.svg';
import search from './../../../assets/icons/search.svg';
import FilterParcel from './FilterParcel';
import { useState } from 'react';

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
    </div>
  );
};

export default MyParcels;
