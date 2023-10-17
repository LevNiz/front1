import { NavLink, useNavigate } from 'react-router-dom';

import call from '../../../assets/icons/new-call.svg';
import leftArrow from '../../../assets/icons/arrow-left.svg';
import logo from '../../../assets/icons/logo2.svg';
import back from '../../../assets/icons/back.svg';
import { Controller, useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';

const ResetPass = () => {
  const navigate = useNavigate();

  const {
    watch,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data.phone);
  };

  const phone = watch('phone');

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
      <div className='py-20 h-full w-full mm:w-3/5 lg:w-4/6 flex justify-center items-center px-4 overflow-y-scroll'>
        <div className='mm:max-w-[400px] w-full'>
          <div className='mm:hidden' onClick={() => navigate(-1)}>
            <img src={leftArrow} className='absolute top-4 left-4' alt='*' />
          </div>
          <h1 className='text-[32px] font-medium'>Забыли пароль?</h1>
          <p className='text-colGray3 my-2 sm:my-3 pb-3'>
            Не волнуйтесь! Такое случается. Пожалуйста, введите номер вашего
            телефона, связанный с вашей учетной записью
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-8'>
              <p className='font-medium mb-2'>Ваш телефон</p>
              <div className='relative mb-1 border border-colGray2 p-[16px] mm:p-[15px_20px_15px_36px] rounded-lg'>
                <Controller
                  name='phone'
                  control={control}
                  defaultValue=''
                  rules={{
                    required: 'Поле обязательно к заполнению!',
                  }}
                  render={({ field }) => (
                    <PhoneInput
                      countryCodeEditable={false}
                      placeholder='Введите номер телефона'
                      country={'kg'}
                      name='phone'
                      specialLabel={true}
                      onChange={(value) => {
                        field.onChange(`+${value}`);
                      }}
                      value={field.value}
                      inputProps={{
                        className:
                          'w-full focus:border-black focus:outline-none pl-14',
                      }}
                    />
                  )}
                />
                <img
                  className='absolute top-[15px] left-[10px] hidden mm:block'
                  src={call}
                  alt='*'
                />
              </div>
              {errors?.phone && (
                <p className='text-red-500 mt-1 text-sm'>
                  {errors?.phone.message || 'Error!'}
                </p>
              )}
            </div>
            <button
              disabled={phone === undefined ? true : false}
              type='submit'
              className={`${
                phone === undefined
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
    </div>
  );
};

export default ResetPass;
