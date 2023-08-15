import { useNavigate } from 'react-router-dom';
import lock from '../../assets/icons/lock.svg';
import leftArrow from '../../assets/icons/arrow-left.svg';
import showPass from '../../assets/icons/show-pass.svg';
import { useState } from 'react';

const AuthPassword = () => {
  const [visiblePass, setVisiblePass] = useState(false);
  const [visiblePassConfirm, setVisiblePassConfirm] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <form className='mm:max-w-[400px] w-full pb-5'>
        <div className='mm:hidden' onClick={() => navigate(-1)}>
          <img src={leftArrow} className='absolute top-4 left-4' alt='*' />
        </div>
        <h2 className='text-3xl mm:text-[32px] font-medium'>
          Придумайте пароль
        </h2>
        <p className='text-colGray3 my-2 sm:my-4 pb-3'>
          Придумайте пароль для входа в ваш аккаунт с вашим номером телефона
        </p>
        <div>
          <p className='font-bold mb-2'>Пароль</p>
          <div className='mb-6 relative'>
            <input
              className='w-full border border-colGray2 p-[15px_44px_15px_44px] rounded-lg focus:border-black focus:outline-none'
              type={`${visiblePass ? 'text' : 'password'}`}
              placeholder='Пароль'
            />
            <img
              className='absolute top-[15px] left-[10px]'
              src={lock}
              alt='*'
            />
            <div
              onClick={() => setVisiblePass(!visiblePass)}
              className='absolute top-[15px] right-[10px] cursor-pointer'
            >
              <img src={showPass} alt='*' />
              <span
                className={`${
                  visiblePass ? 'block' : 'hidden'
                } absolute top-[11px] -rotate-[35deg] w-7 h-[1.5px] bg-colGray3`}
              ></span>
            </div>
          </div>
        </div>
        <div>
          <p className='font-bold mb-2'>Подтвердить пароль</p>
          <div className='mb-6 relative'>
            <input
              className='w-full border border-colGray2 p-[15px_44px_15px_44px] rounded-lg focus:border-black focus:outline-none'
              type={`${visiblePassConfirm ? 'text' : 'password'}`}
              placeholder='Подтвердить пароль'
            />
            <img
              className='absolute top-[15px] left-[10px]'
              src={lock}
              alt='*'
            />
            <div
              onClick={() => setVisiblePassConfirm(!visiblePassConfirm)}
              className='absolute top-[15px] right-[10px] cursor-pointer'
            >
              <img src={showPass} alt='*' />
              <span
                className={`${
                  visiblePassConfirm ? 'block' : 'hidden'
                } absolute top-[11px] -rotate-[35deg] w-7 h-[1.5px] bg-colGray3`}
              ></span>
            </div>
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
        <button
          type='submit'
          className='p-[17px] rounded-lg bg-black text-white flex justify-center items-center w-full font-bold hover:opacity-80 duration-150'
        >
          Зарегистрироваться
        </button>
      </form>
    </>
  );
};

export default AuthPassword;
