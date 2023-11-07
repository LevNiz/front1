import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { scrollToTop } from '../../helpers/ScrollToTop/scrollToTop';
import { ApplicationsItem } from '../../components';
import calculator from './../../assets/icons/calculator.svg';
import noun from './../../assets/icons/white-noun.svg';

const Applications = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className='py-24 content'>
      <div className='flex justify-center space-x-4 sm:space-x-8 pt-8'>
        <NavLink
          className='p-5 rounded-2xl max-w-[200px] w-full bg-sky text-white'
          to='calculate'
        >
          <div className='flex justify-between items-start mb-3'>
            <div className='w-10 h-10 flex justify-center items-center rounded-full bg-black bg-opacity-10'>
              <img className='w-7' src={calculator} alt='*' />
            </div>
            <div className='w-8 h-8 flex justify-center items-center rounded-full bg-white bg-opacity-10'>
              <img className='w-6' src={noun} alt='*' />
            </div>
          </div>
          <span className='font-medium'>Рассчитать</span>
        </NavLink>
        <NavLink
          className='p-5 rounded-2xl max-w-[200px] w-full bg-orange text-white'
          to='send-application'
        >
          <div className='flex justify-between items-start mb-3'>
            <div className='w-10 h-10 flex justify-center items-center rounded-full bg-black bg-opacity-10'>
              <img className='w-7' src={calculator} alt='*' />
            </div>
            <div className='w-8 h-8 flex justify-center items-center rounded-full bg-white bg-opacity-10'>
              <img className='w-6' src={noun} alt='*' />
            </div>
          </div>
          <span className='font-medium'>Отправка</span>
        </NavLink>
      </div>
      <h2 className='font-medium text-2xl mt-20 text-center'>
        Мои текущие заявки
      </h2>
      <ApplicationsItem />
    </div>
  );
};

export default Applications;
