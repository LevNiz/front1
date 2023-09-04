import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDepots } from '../../api/depots';
import { DepotItem } from '../../components';
import FilterModal from '../../components/Depots/FilterModal';
import { ContentLoading } from '../../helpers/Loader/Loader';

const Depots = () => {
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const { depots, loading, error } = useSelector((state) => state?.depots);

  const dispatch = useDispatch();

  const openFilterModal = (e) => {
    e.preventDefault();
    setFilterModalOpen(true);
  };

  const closeFilterModal = () => {
    setFilterModalOpen(false);
  };

  useEffect(() => {
    (async () => {
      await fetchDepots(dispatch);
    })();
  }, []);

  return (
    <div className='content pb-12'>
      <form className='pt-14 pb-6 md:flex'>
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
          className='md:max-w-[255px] mt-4 md:mt-0 md:ml-5 w-full bg-black h-[50px] font-semibold text-white rounded-[10px] hover:opacity-80 duration-150'
          type='submit'
        >
          Поиск
        </button>
      </form>
      <div className='relative'>
        <FilterModal isOpen={isFilterModalOpen} onClose={closeFilterModal} />
      </div>
      <h1 className='text-2xl md:text-4xl font-semibold text-center my-8 md:my-14'>
        Склады
      </h1>
      {loading ? (
        <ContentLoading />
      ) : error ? (
        'Error'
      ) : (
        <DepotItem data={depots} />
      )}
    </div>
  );
};

export default Depots;
