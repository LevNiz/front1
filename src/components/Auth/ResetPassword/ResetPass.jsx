import { NavLink, useNavigate } from 'react-router-dom';

import email from '../../../assets/icons/new-email.svg';
import leftArrow from '../../../assets/icons/arrow-left.svg';
import logo from '../../../assets/icons/logo2.svg';
import back from '../../../assets/icons/back.svg';
import { useForm } from 'react-hook-form';
import { fetchResetPasswordEmail } from '../../../api/user';
import { useState } from 'react';
import { Loading } from '../../../helpers/Loader/Loader';

const ResetPass = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    watch,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: 'onChange' });

  const onSubmit = async (data) => {
    setIsLoading(true);
    const { success } = await fetchResetPasswordEmail(data);
    if (success) {
      navigate('step-1');
      setIsLoading(false);
    } else {
      setIsLoading(false);
      alert('Ваша почта не зарегистрирована в нашей системе!');
    }
  };

  const phone = watch('email');

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
          <img className='w-32' src={logo} alt='*' />
        </NavLink>
      </div>
      <div className='py-20 h-full w-full mm:w-3/5 lg:w-4/6 flex justify-center items-center px-4 overflow-y-scroll'>
        <div className='mm:max-w-[400px] w-full'>
          <div className='mm:hidden' onClick={() => navigate(-1)}>
            <img src={leftArrow} className='absolute top-4 left-4' alt='*' />
          </div>
          <h1 className='text-[32px] font-medium'>Забыли пароль?</h1>
          <p className='text-colGray3 my-2 sm:my-3 pb-3'>
            Не волнуйтесь! Такое случается. Пожалуйста, введите вашу электронную
            почту, связанный с вашей учетной записью
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-8'>
              <p className='font-medium mb-2'>Ваш email</p>
              <div className='mb-6 relative'>
                <input
                  className='w-full border border-colGray2 p-[16px] mm:p-[15px_20px_15px_44px] rounded-lg focus:border-black focus:outline-none'
                  type='email'
                  defaultValue=''
                  placeholder='Введите ваш email'
                  {...register('email', {
                    required: 'Поле обязательно к заполнению!',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Введите корректный адрес электронной почты',
                    },
                    validate: (value) => {
                      const lowercaseValue = value.toLowerCase();
                      if (value !== lowercaseValue) {
                        return 'Используйте только строчные буквы';
                      }
                      return true;
                    },
                  })}
                />
                <img
                  className='absolute top-[15px] left-[10px] hidden mm:block'
                  src={email}
                  alt='*'
                />
                {errors?.email && (
                  <p className='text-red-500 mt-1 text-sm'>
                    {errors?.email.message || 'Error!'}
                  </p>
                )}
              </div>
            </div>
            <button
              disabled={phone === '' ? true : false}
              type='submit'
              className={`${
                phone === ''
                  ? 'opacity-60 cursor-not-allowed'
                  : 'hover:opacity-80'
              } p-[17px] rounded-lg bg-colYellow mm:bg-black mm:text-white flex justify-center items-center w-full font-bold duration-150`}
            >
              Отправить код
            </button>
          </form>
          <div className='flex justify-center mt-12'>
            <p className='text-base text-colGray3 mr-2'>Помните пароль?</p>
            <NavLink
              className='text-base text-black font-medium'
              to='/auth/sign-in'
            >
              Войти
            </NavLink>
          </div>
        </div>
      </div>
      {isLoading && <Loading />}
    </div>
  );
};

export default ResetPass;
