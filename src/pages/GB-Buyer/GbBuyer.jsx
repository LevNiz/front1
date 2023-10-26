import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { GBBuyerItem } from '../../components';
import { searchBuyer } from '../../api/buyer';
import FilterModal from '../../components/GBBuyer/FilterModal';

const GbBuyer = () => {
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
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

  const onSubmit = async (data) => {
    await searchBuyer(data.buyer, dispatch);
  };

  return (
    <div className='content py-20 min-h-[768px]'>
      <div className='max-w-[1120px] w-full mx-auto my-3'>
        <form className='pt-4 sm:pt-4 pb-2 md:flex'>
          <div className='flex border border-colGray rounded-[10px] p-1 w-full'>
            <input
              className='px-2 w-full focus:outline-none'
              placeholder='Поиск по имени...'
              {...register('buyer', {
                required: 'Введите имя байера!',
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
        {errors?.buyer && (
          <p className='text-red-500 text-sm'>
            {errors?.buyer.message || 'Error!'}
          </p>
        )}
      </div>
      <div className='relative'>
        <FilterModal isOpen={isFilterModalOpen} onClose={closeFilterModal} />
      </div>
      <h1 className='text-3xl py-6 font-bold'>GB-Buyer</h1>
      <GBBuyerItem />
    </div>
  );
};

export default GbBuyer;
