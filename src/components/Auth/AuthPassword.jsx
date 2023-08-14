import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/icons/logo2.svg';
import lock from '../../assets/icons/lock.svg';
import back from '../../assets/icons/back.svg';
import leftArrow from '../../assets/icons/arrow-left.svg';

const AuthPassword = () => {
  const navigate = useNavigate();

  return (
    <div className='flex w-full h-screen'>
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
      <div className='w-full mm:w-3/5 flex flex-col justify-around items-center py-10 mm:py-20 px-4'>
        <form className='mm:max-w-[400px] w-full'>
          <div className='mm:hidden' onClick={() => navigate(-1)}>
            <img src={leftArrow} className='absolute top-4 left-4' alt='*' />
          </div>
          <h2 className='text-black text-2xl font-bold'>Придумайте пароль</h2>
          <p className='text-colGray3 my-2 sm:my-4'>
            Придумайте пароль для входа в ваш аккаунт с вашим номером телефона
          </p>
          <div>
            <p className='font-bold mb-2'>Пароль</p>
            <div className='mb-6 relative'>
              <input
                className='w-full border border-colGray2 p-[15px_20px_15px_44px] rounded-lg focus:border-black focus:outline-none'
                type='password'
                placeholder='Пароль'
              />
              <img
                className='absolute top-[15px] left-[10px]'
                src={lock}
                alt='*'
              />
            </div>
          </div>
          <div>
            <p className='font-bold mb-2'>Подтвердить пароль</p>
            <div className='mb-6 relative'>
              <input
                className='w-full border border-colGray2 p-[15px_20px_15px_44px] rounded-lg focus:border-black focus:outline-none'
                type='password'
                placeholder='Подтвердить пароль'
              />
              <img
                className='absolute top-[15px] left-[10px]'
                src={lock}
                alt='*'
              />
            </div>
          </div>
          <div className='mb-7'>
            <div className='flex items-center my-2'>
              <span className='min-w-[10px] h-[10px] rounded-full bg-colYellow'></span>
              <p className='text-[#AAA] ml-3 text-xs sm:text-base'>
                Прописные и строчные латинские буквы
              </p>
            </div>
            <div className='flex items-center my-2'>
              <span className='min-w-[10px] h-[10px] rounded-full bg-colGray2'></span>
              <p className='text-[#AAA] ml-3 text-xs sm:text-base'>
                Минимум одна цифра
              </p>
            </div>
            <div className='flex items-center my-2'>
              <span className='min-w-[10px] h-[10px] rounded-full bg-colGray2'></span>
              <p className='text-[#AAA] ml-3 text-xs sm:text-base'>
                Минимум один спецсимвол
              </p>
            </div>
          </div>
          <NavLink
            to='/register/confirm'
            className='p-[17px] rounded-lg bg-black text-white flex justify-center items-center w-full font-bold hover:opacity-80 duration-150'
          >
            Подтвердить
          </NavLink>
        </form>
      </div>
    </div>
  );
};

export default AuthPassword;
