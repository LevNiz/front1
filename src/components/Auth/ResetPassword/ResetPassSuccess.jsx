import { NavLink, useNavigate } from 'react-router-dom';
import leftArrow from '../../../assets/icons/arrow-left.svg';

const ResetPassSuccess = () => {
  const navigate = useNavigate();

  return (
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
  );
};

export default ResetPassSuccess;
