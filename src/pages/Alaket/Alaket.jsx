import { useEffect, useState } from 'react';
import { AlaketItem } from '../../components';
import { scrollToTop } from '../../helpers/ScrollToTop/scrollToTop';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { searchAlaket } from '../../api/alaket';
import FilterModal from '../../components/Alaket/FilterModal';

const Alaket = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await searchAlaket(data.alaketTitle, dispatch);
  };

  const openFilterModal = (e) => {
    e.preventDefault();
    setFilterModalOpen(true);
  };

  const closeFilterModal = () => {
    setFilterModalOpen(false);
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className='content py-20 min-h-[720px]'>
      <div className='flex justify-between items-center pb-5 pt-5 sm:pt-8'>
        <h1 className='text-2xl mr-3 sm:text-3xl font-medium sm:font-bold text-center'>
          Алакет
        </h1>
        <button
          onClick={() => navigate('new')}
          className='font-medium hover:opacity-80 p-3 rounded-lg bg-colYellow duration-150 max-w-[180px] sm:max-w-[240px] w-full'
        >
          Опубликовать
        </button>
      </div>
      <div className='max-w-[1120px] w-full mx-auto pb-5'>
        <form className='pt-4 sm:pt-4 pb-2 md:flex'>
          <div className='flex border border-colGray rounded-[10px] p-1 w-full'>
            <input
              className='px-2 w-full focus:outline-none'
              placeholder='Поиск по названию...'
              {...register('alaketTitle', {
                required: false,
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
      <AlaketItem />
    </div>
  );
};

export default Alaket;
