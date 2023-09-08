import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDepots, searchDepot } from '../../api/depots';
import { DepotItem } from '../../components';
import FilterModal from '../../components/Depots/FilterModal';
import { ContentLoading } from '../../helpers/Loader/Loader';
import notFound from './../../assets/images/404.svg';

const Depots = () => {
  const { depots, loading, error } = useSelector((state) => state?.depots);

  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const [depotData, setDepotData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

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
    setDepotData(depots);
  }, [depots]);

  const onSubmit = async (value) => {
    setIsLoading(true);
    const { success, data } = await searchDepot(value.searchDepot);
    if (success) {
      setDepotData(data);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  const receiveDataFromChild = (data) => {
    setDepotData(data);
  };

  return (
    <div className='content pb-12'>
      <form className='pt-14 pb-2 md:flex'>
        <div className='flex border border-colGray rounded-[10px] p-1 w-full'>
          <input
            className='px-2 w-full focus:outline-none'
            placeholder='Поиск по названию...'
            {...register('searchDepot', {
              required: 'Введите название склада...',
            })}
          />
          <button
            onClick={(e) => openFilterModal(e)}
            className='w-[116px] h-10 bg-colYellow rounded-lg hover:bg-colYellowHover duration-100'
          >
            Фильтр
          </button>
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
      <div className='relative'>
        <FilterModal
          isOpen={isFilterModalOpen}
          onClose={closeFilterModal}
          dataFromChild={receiveDataFromChild}
        />
      </div>
      <h1 className='text-2xl md:text-4xl font-semibold text-center my-8 md:my-14'>
        Склады
      </h1>
      {loading ? (
        <ContentLoading height='140px' />
      ) : error ? (
        <div className='bg-red-500 text-white px-4 py-2 rounded-md mt-12 w-max mx-auto'>
          Произошла ошибка во время выполнения операции. Пожалуйста, повторите
          попытку позже...
        </div>
      ) : isLoading ? (
        <ContentLoading height='140px' />
      ) : depotData?.length > 0 ? (
        <DepotItem depotData={depotData} />
      ) : (
        <div className='py-10'>
          <img className='mx-auto' src={notFound} alt='*' />
          <p className='text-center font-medium text-xl mt-5'>
            По вашему запросу ничего не нашли...
          </p>
        </div>
      )}
    </div>
  );
};

export default Depots;
