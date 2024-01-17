import { NavLink, useNavigate } from 'react-router-dom';

import leftArrow from '../../../assets/icons/arrow-left.svg';
import logo from '../../../assets/icons/logo2.svg';
import back from '../../../assets/icons/back.svg';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { postSendCode } from '../../../api/user';
import { Loading } from '../../../helpers/Loader/Loader';

const ResetPassConfirm = () => {
  const [codeVal, setCodeVal] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { watch, register, handleSubmit } = useForm({ mode: 'onChange' });
  const code = watch('code');

  const onSubmit = async () => {
    setIsLoading(true);
    const { success, data } = await postSendCode(codeVal);
    if (success) {
      navigate('/auth/reset-password/step-2', { state: data });
      setIsLoading(false);
    } else {
      setIsLoading(false);
      alert('Код больше не действителен!');
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
      <div className='py-20 h-full w-full mm:w-3/5 lg:w-4/6 flex justify-center items-center px-4 overflow-y-scroll'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='mm:max-w-[400px] w-full'
        >
          <div className='mm:hidden' onClick={() => navigate(-1)}>
            <img src={leftArrow} className='absolute top-4 left-4' alt='*' />
          </div>
          <h2 className='text-black text-2xl font-bold'>Введите код</h2>
          <p className='text-colGray3 my-4'>
            Введите код подтверждения, который мы только что отправили на вашу
            электронную почту
          </p>
          <div className='flex items-center my-12 space-x-3'>
            <input
              className='w-40 h-[60px] xs:h-[60px] px-3 rounded-md bg-white border border-gray-400 text-center text-[22px] font-medium focus:outline-none'
              defaultValue=''
              placeholder='Введите код'
              {...register('code', {
                required: true,
              })}
              type='text'
              maxLength={7}
              onInput={(e) => {
                const inputValue = e.target.value.replace(/\D/g, '');
                e.target.value = inputValue.substring(0, 6);
                e.target.value = inputValue.replace(
                  /(\d{3})(\d{1,3})?/,
                  '$1 $2'
                );
                setCodeVal(inputValue);
              }}
            />
            {/* <input
              className='xs:w-[66px] w-[60px] h-[60px] xs:h-[60px] px-1 rounded-md bg-colBgGray2 text-center text-[22px] font-medium focus:outline-none'
              defaultValue='1'
              type='text'
              onInput={(e) =>
                (e.target.value = e.target.value.replace(/\D/, ''))
              }
            />
            <input
              className='xs:w-[66px] w-[60px] h-[60px] xs:h-[60px] px-1 rounded-md bg-colBgGray2 text-center text-[22px] font-medium focus:outline-none'
              defaultValue='9'
              type='text'
              onInput={(e) =>
                (e.target.value = e.target.value.replace(/\D/, ''))
              }
            />
            <input
              className='xs:w-[66px] w-[60px] h-[60px] xs:h-[60px] px-1 rounded-md bg-colBgGray2 text-center text-[22px] font-medium focus:outline-none'
              defaultValue='7'
              type='text'
              onInput={(e) =>
                (e.target.value = e.target.value.replace(/\D/, ''))
              }
            />
            <input
              className='xs:w-[66px] w-[60px] h-[60px] xs:h-[60px] px-1 rounded-md bg-colBgGray2 text-center text-[22px] font-medium focus:outline-none'
              defaultValue='9'
              type='text'
              onInput={(e) =>
                (e.target.value = e.target.value.replace(/\D/, ''))
              }
            />
            <input
              className='xs:w-[66px] w-[60px] h-[60px] xs:h-[60px] px-1 rounded-md bg-colBgGray2 text-center text-[22px] font-medium focus:outline-none'
              defaultValue='7'
              type='text'
              onInput={(e) =>
                (e.target.value = e.target.value.replace(/\D/, ''))
              }
            /> */}
          </div>
          <button
            disabled={code === '' ? true : false}
            className={`${
              code === '' ? 'opacity-60 cursor-not-allowed' : 'hover:opacity-80'
            } p-[17px] rounded-lg text-white bg-black flex justify-center items-center w-full font-bold duration-150`}
          >
            Подтвердить
          </button>
          {/* <div className='flex justify-center flex-wrap mt-12'>
            <p className='text-base text-colGray3 mr-2'>Не получили код?</p>
            <NavLink to='#' className='text-base text-black font-medium'>
              Отправить еще раз
            </NavLink>
          </div> */}
        </form>
      </div>
      {isLoading ? <Loading /> : ''}
    </div>
  );
};

export default ResetPassConfirm;
