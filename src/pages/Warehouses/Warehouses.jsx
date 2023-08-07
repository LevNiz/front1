import { useState } from 'react';
import { WareHouseItem } from '../../components';
import FilterModal from '../../components/Warehouses/FilterModal';
import { warehouses } from '../../constants/wareHouseData';

const Warehouses = () => {
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);

  const openFilterModal = (e) => {
    e.preventDefault();
    setFilterModalOpen(true);
  };

  const closeFilterModal = () => {
    setFilterModalOpen(false);
  };
  return (
    <div className='content pb-12'>
      <form className='pt-14 pb-6 flex'>
        <div className='flex border border-colGray rounded-[10px] p-1 w-full'>
          <input
            className='px-2 w-full focus:outline-none'
            type='text'
            placeholder='Страна, город, склад...'
          />
          <button
            onClick={(e) => openFilterModal(e)}
            className='w-[116px] h-10 bg-colYellow rounded-lg hover:bg-colYellowHover duration-100'
          >
            Фильтр
          </button>
        </div>
        <button
          className='max-w-[255px] ml-5 w-full bg-black h-[50px] font-semibold text-white rounded-[10px]'
          type='submit'
        >
          Поиск
        </button>
      </form>
      <div className='relative'>
        <FilterModal isOpen={isFilterModalOpen} onClose={closeFilterModal} />
      </div>
      <h1 className='text-4xl font-semibold text-center mt-14 mb-16'>Склады</h1>
      <WareHouseItem data={warehouses} />
    </div>
  );
};

export default Warehouses;
