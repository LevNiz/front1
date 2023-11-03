import { NavLink } from 'react-router-dom';
import errorImg from '../../assets/images/error.svg';

export const ErrorServer = () => {
  return (
    <div className='flex justify-center items-center w-full py-10'>
      <div className='w-full max-w-sm'>
        <img className='mx-auto w-56' src={errorImg} alt='*' />
        <h4 className='text-xl sm:text-2xl font-medium pb-6 text-center'>
          Произошла ошибка, повторите <br />
          попытку позже!
        </h4>
        <NavLink
          to='/'
          className='max-w-[255px] mx-auto w-full flex justify-center items-center bg-black h-[48px] font-medium text-white rounded-[10px] hover:opacity-80 duration-150'
        >
          Перейти на главную
        </NavLink>
      </div>
    </div>
  );
};
