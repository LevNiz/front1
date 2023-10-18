import { NavLink } from 'react-router-dom';
import { ApplicationsItem } from '../../components';
import calculator from './../../assets/icons/calculator.svg';
import box from './../../assets/icons/my-parcel.svg';

const Applications = () => {
  return (
    <div className='py-24 content'>
      <div className='flex justify-center space-x-8 pt-8'>
        <NavLink
          className='shadow-[0_8px_34px_#00000026] p-5 rounded-lg max-w-[220px] w-full text-center'
          to='calculate'
        >
          <img className='w-6 mx-auto' src={calculator} alt='*' />
          <span className='font-medium'>Рассчитать</span>
        </NavLink>
        <NavLink
          className='shadow-[0_8px_34px_#00000026] p-5 rounded-lg max-w-[220px] w-full text-center'
          to='send-application'
        >
          <img className='w-6 mx-auto' src={box} alt='*' />
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
