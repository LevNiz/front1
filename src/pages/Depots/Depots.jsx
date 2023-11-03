import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDepots, searchDepot } from '../../api/depots';
import { DepotItem } from '../../components';
import FilterModal from '../../components/Depots/FilterModal';
import { ContentLoading } from '../../helpers/Loader/Loader';
import { ErrorServer } from '../../helpers/Errors/ErrorServer';
import { ErrorEmpty } from '../../helpers/Errors/ErrorEmpty';
import { scrollToTop } from '../../helpers/ScrollToTop/scrollToTop';

const Depots = () => {
  const { depots, loading, error } = useSelector((state) => state?.depots);
  const dispatch = useDispatch();

  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const [depotData, setDepotData] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

  useEffect(() => {
    scrollToTop();
    setDepotData(depots);
  }, [depots]);

  const onSubmit = async (data) => {
    await searchDepot(data.searchDepot, dispatch);
  };

  return (
    <div className='content pt-24 pb-12 min-h-[768px]'>
      <div className='max-w-[1120px] w-full mx-auto'>
        <form className='pt-4 sm:pt-4 pb-2 md:flex'>
          <div className='flex border border-colGray rounded-[10px] p-1 w-full'>
            <input
              className='px-2 w-full focus:outline-none'
              placeholder='Поиск по названию...'
              {...register('searchDepot', {
                required: 'Введите название склада!',
              })}
            />
            <div
              onClick={(e) => openFilterModal(e)}
              className='cursor-pointer flex justify-center items-center w-[116px] h-10 bg-colYellow rounded-lg hover:bg-colYellowHover duration-100'
            >
              Фильтр
            </div>
          </div>
          <button
            onClick={handleSubmit(onSubmit)}
            className='md:max-w-[255px] mt-4 md:mt-0 md:ml-5 w-full bg-black h-[50px] font-semibold text-white rounded-[10px] hover:opacity-80 duration-150'
            type='submit'
          >
            Поиск
          </button>
        </form>
        {errors?.searchDepot && (
          <p className='text-red-500 text-sm'>
            {errors?.searchDepot.message || 'Error!'}
          </p>
        )}
      </div>
      <div className='relative'>
        <FilterModal isOpen={isFilterModalOpen} onClose={closeFilterModal} />
      </div>
      <h1 className='text-2xl md:text-3xl font-semibold my-6 md:my-10'>
        Наши склады
      </h1>
      {loading ? (
        <ContentLoading extraStyle='340px' />
      ) : error ? (
        <ErrorServer />
      ) : depotData?.length ? (
        <div className='grid ss:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6'>
          {depotData?.map((el) => (
            <DepotItem key={el?.id} el={el} />
          ))}
        </div>
      ) : (
        <ErrorEmpty
          title='По вашему запросу ничего не нашли.'
          desc='Здесь будет список складов.'
        />
      )}
    </div>
  );
};

export default Depots;
