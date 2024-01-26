import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { GBBuyerItem } from '../../components';
import { searchBuyer } from '../../api/buyer';
import FilterModal from '../../components/GBBuyer/FilterModal';
import { scrollToTop } from '../../helpers/ScrollToTop/scrollToTop';
import sort from '../../assets/icons/sort.svg';
import { NavLink } from 'react-router-dom';

const GbBuyer = () => {
  const { user } = useSelector((state) => state?.user);
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

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

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className='content py-20 min-h-[768px]'>
      <div className='max-w-[1120px] w-full mx-auto my-3'>
        <form className='pt-4 sm:pt-4 pb-2 md:flex'>
          <div className='flex border border-colGray rounded-[10px] p-1 w-full'>
            <input
              className='px-2 w-full focus:outline-none'
              placeholder='Поиск по имени...'
              {...register('buyer', {
                required: false,
              })}
            />
            <div
              onClick={(e) => openFilterModal(e)}
              className='flex justify-center items-center mr-1 cursor-pointer'
            >
              <img className='w-14 md:w-9' src={sort} alt='*' />
            </div>
            <button
              onClick={handleSubmit(onSubmit)}
              className='max-w-[90px] ss:max-w-[120px] md:max-w-[160px] ml-2 w-full bg-black h-10 font-medium text-white rounded-lg hover:opacity-80 duration-150'
              type='submit'
            >
              Поиск
            </button>
          </div>
          <NavLink
            to={`${user ? 'become-buyer' : '/auth/sign-in'}`}
            className='md:max-w-[200px] flex justify-center items-center mt-4 md:mt-0 md:ml-5 w-full bg-colYellow h-12 font-medium rounded-lg hover:opacity-80 duration-150'
            type='submit'
          >
            Стать buyer ом
          </NavLink>
        </form>
      </div>
      <div className='relative'>
        <FilterModal isOpen={isFilterModalOpen} onClose={closeFilterModal} />
      </div>
      <h1 className='text-xl md:text-3xl py-6 font-bold'>GB-Buyer</h1>
      <GBBuyerItem />
    </div>
  );
};

export default GbBuyer;
