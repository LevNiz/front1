import { NavLink, useNavigate } from 'react-router-dom';
import leftArrow from '../../../assets/icons/arrow-left.svg';

const ResetPassConfirm = () => {
  const navigate = useNavigate();

  return (
    <>
      <form className='mm:max-w-[400px] w-full'>
        <div className='mm:hidden' onClick={() => navigate(-1)}>
          <img src={leftArrow} className='absolute top-4 left-4' alt='*' />
        </div>
        <h2 className='text-black text-2xl font-bold'>Введите код</h2>
        <p className='text-colGray3 my-4'>
          Введите код подтверждения, который мы только что отправили на ваш
          номер телефона
        </p>
        <div className='flex items-center my-12'>
          <input
            className='xs:w-[66px] w-[60px] h-[60px] xs:h-[60px] px-1 rounded-md bg-colBgGray2 text-center text-[22px] font-medium focus:outline-none mr-1 xs:mr-2 sm:mr-5'
            defaultValue='2'
            type='text'
            onInput={(e) => (e.target.value = e.target.value.replace(/\D/, ''))}
          />
          <input
            className='xs:w-[66px] w-[60px] h-[60px] xs:h-[60px] px-1 rounded-md bg-colBgGray2 text-center text-[22px] font-medium focus:outline-none mr-1 xs:mr-2 sm:mr-5'
            defaultValue='1'
            type='text'
            onInput={(e) => (e.target.value = e.target.value.replace(/\D/, ''))}
          />
          <input
            className='xs:w-[66px] w-[60px] h-[60px] xs:h-[60px] px-1 rounded-md bg-colBgGray2 text-center text-[22px] font-medium focus:outline-none mr-1 xs:mr-2 sm:mr-5'
            defaultValue='9'
            type='text'
            onInput={(e) => (e.target.value = e.target.value.replace(/\D/, ''))}
          />
          <input
            className='xs:w-[66px] w-[60px] h-[60px] xs:h-[60px] px-1 rounded-md bg-colBgGray2 text-center text-[22px] font-medium focus:outline-none'
            defaultValue='7'
            type='text'
            onInput={(e) => (e.target.value = e.target.value.replace(/\D/, ''))}
          />
        </div>
        <NavLink
          to='/auth/reset-password/step-2'
          className='p-[17px] rounded-lg bg-black text-white flex justify-center items-center w-full font-bold hover:opacity-80 duration-150'
        >
          Подтвердить
        </NavLink>
        <div className='flex justify-center flex-wrap mt-12'>
          <p className='text-base text-black font-medium mr-2'>
            Не получили код?
          </p>
          <NavLink to='#' className='text-base text-colYellow'>
            Отправить еще раз
          </NavLink>
        </div>
      </form>
    </>
  );
};

export default ResetPassConfirm;
