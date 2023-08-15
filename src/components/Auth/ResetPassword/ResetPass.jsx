import { NavLink, useNavigate } from 'react-router-dom';
import call from '../../../assets/icons/call2.svg';
import leftArrow from '../../../assets/icons/arrow-left.svg';

const ResetPass = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className='mm:max-w-[400px] w-full'>
        <div className='mm:hidden' onClick={() => navigate(-1)}>
          <img src={leftArrow} className='absolute top-4 left-4' alt='*' />
        </div>
        <h1 className='text-[32px] font-medium'>Забыли пароль?</h1>
        <p className='text-colGray3 my-2 sm:my-3 pb-3'>
          Не волнуйтесь! Такое случается. Пожалуйста, введите номер вашего
          телефона, связанный с вашей учетной записью
        </p>
        <form>
          <div className='mb-8 relative'>
            <input
              className='w-full border border-colGray2 p-[15px_20px_15px_44px] rounded-lg focus:border-black focus:outline-none'
              type='number'
              placeholder='Ваш номер'
            />
            <img
              className='absolute top-[15px] left-[10px]'
              src={call}
              alt='*'
            />
          </div>
          <NavLink
            to='step-1'
            className='p-[17px] rounded-lg bg-colYellow mm:bg-black mm:text-white flex justify-center items-center w-full font-bold hover:opacity-80 duration-150'
          >
            Отправить код
          </NavLink>
        </form>
        <div className='flex justify-center mt-12'>
          <p className='text-base text-black font-medium mr-2'>
            Помните пароль?
          </p>
          <NavLink className='text-base text-colYellow' to='/login'>
            Войти
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default ResetPass;
