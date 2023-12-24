import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { scrollToTop } from '../../helpers/ScrollToTop/scrollToTop';
import { ApplicationsItem } from '../../components';
import calculator from './../../assets/icons/calc.svg';
import truck from './../../assets/icons/send.svg';
import nounCalc from './../../assets/icons/calc-noun.svg';
import sendCalc from './../../assets/icons/send-noun.svg';

const Applications = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className='py-24 content'>
      <div className='flex justify-center space-x-4 sm:space-x-8 pt-8'>
        <NavLink
          className='p-3 sm:p-5 rounded-2xl w-full bg-black text-white'
          to='calculate'
        >
          <div className='flex justify-between items-start mb-3'>
            <img className='w-8 sm:w-10' src={calculator} alt='*' />
            <img className='w-8' src={nounCalc} alt='*' />
          </div>
          <span className='font-medium'>Рассчитать</span>
        </NavLink>
        <NavLink
          className='p-3 sm:p-5 rounded-2xl w-full bg-colYellow'
          to='send-application'
        >
          <div className='flex justify-between items-start mb-3'>
            <img className='w-8 sm:w-10' src={truck} alt='*' />
            <img className='w-8' src={sendCalc} alt='*' />
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
