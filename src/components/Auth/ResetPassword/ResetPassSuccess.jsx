import { NavLink, useNavigate } from 'react-router-dom';

import leftArrow from '../../../assets/icons/arrow-left.svg';
import logo from '../../../assets/icons/logo2.svg';
import back from '../../../assets/icons/back.svg';

const ResetPassSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className='flex w-full mm:h-screen'>
      <div className='hidden mm:w-2/5 lg:w-2/6 bg-black mm:flex justify-center items-center'>
        <div onClick={() => navigate(-1)}>
          <img
            className='absolute top-10 left-10 cursor-pointer'
            src={back}
            alt='*'
          />
        </div>
        <NavLink to='/'>
          <img src={logo} alt='*' />
        </NavLink>
      </div>
      <div className='py-20 h-screen w-full mm:w-3/5 lg:w-4/6 flex justify-center items-center px-4 overflow-y-scroll'>
        <div className='mm:max-w-[400px] w-full h-full mm:h-auto flex flex-col mm:block justify-center mm:justify-start'>
          <div className='mm:hidden' onClick={() => navigate(-1)}>
            <img src={leftArrow} className='absolute top-4 left-4' alt='*' />
          </div>
          <h2 className='text-black text-3xl font-bold text-center'>
            Пароль изменен!
          </h2>
          <p className='text-colGray3 my-2 sm:my-4 pb-5 text-center'>
            Ваш пароль был успешно изменен
          </p>
          <NavLink
            to='/auth/sign-in'
            className='p-[17px] rounded-lg bg-black text-white flex justify-center items-center w-full font-bold hover:opacity-80 duration-150'
          >
            Войти
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ResetPassSuccess;
