import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import leftArrow from '../../../assets/icons/arrow-left.svg';
import showPass from '../../../assets/icons/show-pass.svg';
import pass from '../../../assets/icons/new-password.svg';
import pass2 from '../../../assets/icons/new-confirm-password.svg';
import logo from '../../../assets/icons/logo2.svg';
import back from '../../../assets/icons/back.svg';
import { postResetPassword } from '../../../api/user';
import { Loading } from '../../../helpers/Loader/Loader';

const ResetPassNew = () => {
  const [visiblePass, setVisiblePass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [visiblePassConfirm, setVisiblePassConfirm] = useState(false);

  const navigate = useNavigate();
  const { state } = useLocation();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const password = watch('password', '');
  const confirmPass = watch('confirmPassword', '');

  const hasLowerCaseUpperCase = /^(?=.*[a-z])(?=.*[A-Z])/.test(password);
  const hasNumber = /^(?=.*\d)/.test(password);
  const hasSpecialChar = /^(?=.*[@$!%*?&#])/.test(password);
  const hasSamePassword = password !== '' && password === confirmPass;

  const onSubmit = async (data) => {
    setIsLoading(true);
    const { success } = await postResetPassword(data, state);
    if (success) {
      navigate('/auth/reset-password/success');
      setIsLoading(false);
    } else {
      setIsLoading(false);
      alert('Что-то пошло не так! Повторите еще раз!');
    }
  };

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
      <div className='py-20 h-full w-full mm:w-3/5 lg:w-4/6 flex justify-center items-center  px-4 overflow-y-scroll'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='mm:max-w-[400px] w-full pb-5'
        >
          <div className='mm:hidden' onClick={() => navigate(-1)}>
            <img src={leftArrow} className='absolute top-4 left-4' alt='*' />
          </div>
          <h2 className='text-black text-2xl font-bold'>Придумайте пароль</h2>
          <p className='text-colGray3 my-2 sm:my-4'>
            Придумайте пароль для следующего входа в ваш аккаунт с вашим номером
            телефона
          </p>
          <div>
            <p className='font-medium mb-2'>Новый пароль</p>
            <div className='relative'>
              <img
                className='absolute top-[15px] left-[10px] hidden mm:block'
                src={pass}
                alt='*'
              />
              <input
                className='w-full border border-colGray2 p-[16px] mm:p-[15px_20px_15px_44px] rounded-lg focus:border-black focus:outline-none'
                type={`${visiblePass ? 'text' : 'password'}`}
                placeholder='Введите новый пароль'
                {...register('password', {
                  required: 'Поле обязательно к заполнению!',
                  validate: (value) => {
                    if (!/^(?=.*[a-z])(?=.*[A-Z])/.test(value)) {
                      return 'Требуется хотя бы одна строчная и прописная буква!';
                    }
                    if (!/(?=.*\d)/.test(value)) {
                      return 'Требуется хотя бы одна цифра!';
                    }
                    if (!/(?=.*[@$!%*?&#])/.test(value)) {
                      return 'Требуется хотя бы один специальный символ!';
                    }
                    if (value.length < 6) {
                      return 'Минимальная длина пароля - 6 символов!';
                    }
                    return true;
                  },
                })}
              />
              <div
                onClick={() => setVisiblePass(!visiblePass)}
                className='absolute top-[15px] right-[10px] cursor-pointer'
              >
                <img src={showPass} alt='*' />
                <span
                  className={`${
                    visiblePass ? 'block' : 'hidden'
                  } absolute top-[11px] -left-[2px] -rotate-[35deg] w-7 h-[1.5px] bg-colGray3`}
                ></span>
              </div>
            </div>
            {errors?.password && (
              <p className='text-red-500 text-sm mt-2'>
                {errors?.password.message || 'Error!'}
              </p>
            )}
          </div>
          <div>
            <p className='font-medium mb-2 mt-5'>Подтвердить пароль</p>
            <div className='relative'>
              <img
                className='absolute top-[15px] left-[10px] hidden mm:block'
                src={pass2}
                alt='*'
              />
              <input
                className='w-full border border-colGray2 p-[16px] mm:p-[15px_20px_15px_44px] rounded-lg focus:border-black focus:outline-none'
                type={`${visiblePassConfirm ? 'text' : 'password'}`}
                placeholder='Подтвердить пароль'
                {...register('confirmPassword', {
                  required: 'Поле обязательно к заполнению!',
                  validate: (value) =>
                    value === password || 'Пароли не совпадают',
                })}
              />
              <div
                onClick={() => setVisiblePassConfirm(!visiblePassConfirm)}
                className='absolute top-[15px] right-[10px] cursor-pointer'
              >
                <img src={showPass} alt='*' />
                <span
                  className={`${
                    visiblePassConfirm ? 'block' : 'hidden'
                  } absolute top-[11px] -left-[2px] -rotate-[35deg] w-7 h-[1.5px] bg-colGray3`}
                ></span>
              </div>
            </div>
          </div>
          {errors?.confirmPassword && (
            <p className='text-red-500 text-sm mt-2'>
              {errors?.confirmPassword.message || 'Error!'}
            </p>
          )}
          <div className='mb-7 mt-4'>
            <div className='flex items-center my-2'>
              <span
                className={`min-w-[10px] h-[10px] rounded-full ${
                  hasLowerCaseUpperCase ? 'bg-colYellow' : 'bg-colGray2'
                }`}
              ></span>
              <p className='text-[#AAA] ml-3 text-xs sm:text-base'>
                Прописные и строчные латинские буквы
              </p>
            </div>
            <div className='flex items-center my-2'>
              <span
                className={`min-w-[10px] h-[10px] rounded-full ${
                  hasNumber ? 'bg-colYellow' : 'bg-colGray2'
                }`}
              ></span>
              <p className='text-[#AAA] ml-3 text-xs sm:text-base'>
                Минимум одна цифра
              </p>
            </div>
            <div className='flex items-center my-2'>
              <span
                className={`min-w-[10px] h-[10px] rounded-full ${
                  hasSpecialChar ? 'bg-colYellow' : 'bg-colGray2'
                }`}
              ></span>
              <p className='text-[#AAA] ml-3 text-xs sm:text-base'>
                Минимум один спецсимвол
              </p>
            </div>
            <div className='flex items-center my-2'>
              <span
                className={`min-w-[10px] h-[10px] rounded-full ${
                  hasSamePassword ? 'bg-colYellow' : 'bg-colGray2'
                }`}
              ></span>
              <p className='text-[#AAA] ml-3 text-xs sm:text-base'>
                Пароли совпадают
              </p>
            </div>
          </div>
          <button className='p-[17px] rounded-lg bg-black text-white flex justify-center items-center w-full font-bold hover:opacity-80 duration-150'>
            Подтвердить
          </button>
        </form>
      </div>
      {isLoading ? <Loading /> : ''}
    </div>
  );
};

export default ResetPassNew;
