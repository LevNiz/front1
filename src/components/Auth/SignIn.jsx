import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { loginUser } from '../../api/user';
import { useDispatch, useSelector } from 'react-redux';

import lock from '../../assets/icons/new-password.svg';
import email from '../../assets/icons/new-email.svg';
import leftArrow from '../../assets/icons/arrow-left.svg';
import showPass from '../../assets/icons/show-pass.svg';
import logo from '../../assets/icons/logo2.svg';
import back from '../../assets/icons/back.svg';
import Modal from '../../helpers/Modals/Modal';

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userID } = useSelector((state) => state?.user);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState();
  const [visiblePass, setVisiblePass] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = async (data) => {
    const { success } = await loginUser(dispatch, data);
    if (success) {
      navigate('/');
    } else {
      setModalOpen(true);
      setModalContent('inCorrectData');
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className='flex w-full mm:h-screen'>
      <div className='hidden mm:w-2/5 lg:w-2/6 bg-black mm:flex justify-center items-center'>
        <div onClick={() => (userID ? navigate(-1) : navigate('/'))}>
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
      <div className='w-full mm:w-3/5 lg:w-4/6 flex flex-col justify-center items-center py-12  px-4 overflow-y-scroll'>
        <div
          className='mm:hidden absolute top-4 left-4'
          onClick={() => navigate('/')}
        >
          <img src={leftArrow} alt='*' />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='mm:max-w-[400px] w-full pb-8'
        >
          <h1 className='mb-8 mm:mb-12 text-3xl mm:text-[32px] font-medium text-center'>
            Авторизация
          </h1>
          <div>
            <p className='font-medium mb-2'>Ваш email</p>
            <div className='mb-6 relative'>
              <input
                className='w-full border border-colGray2 p-[16px] mm:p-[15px_20px_15px_44px] rounded-lg focus:border-black focus:outline-none'
                type='email'
                placeholder='Введите ваш email'
                {...register('email', {
                  required: 'Поле обязательно к заполнению!',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Введите корректный адрес электронной почты',
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
          <div>
            <p className='font-medium mb-2'>Пароль</p>
            <div className='mb-4 relative'>
              <input
                className='w-full border border-colGray2 p-[16px] mm:p-[15px_20px_15px_44px] rounded-lg focus:border-black focus:outline-none'
                type={`${visiblePass ? 'text' : 'password'}`}
                placeholder='Пароль'
                {...register('password', {
                  required: 'Поле обязательно к заполнению!',
                })}
              />
              <img
                className='absolute top-[15px] left-[10px] hidden mm:block'
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
                  } absolute top-[11px] -left-[2px] -rotate-[35deg] w-7 h-[1.5px] bg-colGray3`}
                ></span>
              </div>
            </div>
          </div>
          <NavLink
            className='text-colGray3 text-sm font-medium flex justify-end mb-6'
            to='/auth/reset-password'
          >
            Забыли пароль?
          </NavLink>
          <button
            type='submit'
            className='p-[17px] rounded-lg bg-black text-white flex justify-center items-center w-full font-bold hover:opacity-80 duration-150'
          >
            Войти
          </button>
          <p className='mt-5 mb-2 text-center text-colGray3'>Впервые у нас?</p>
          <NavLink
            className='text-xl font-semibold flex justify-center'
            to='/auth/sign-up'
          >
            Зарегистрироваться
          </NavLink>
        </form>
        <Modal isOpen={modalOpen} onClose={closeModal} content={modalContent} />
      </div>
    </div>
  );
};

export default SignIn;
