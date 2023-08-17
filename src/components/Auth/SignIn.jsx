import { NavLink, useNavigate } from 'react-router-dom';
import lock from '../../assets/icons/lock.svg';
import call from '../../assets/icons/call3.svg';
import leftArrow from '../../assets/icons/arrow-left.svg';
import showPass from '../../assets/icons/show-pass.svg';
import { useState } from 'react';
import Modal from '../Modals/Modal';
import { useForm } from 'react-hook-form';
import { loginUser } from '../../api/auth';
import { useDispatch } from 'react-redux';

const SignIn = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    if(success) {
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
    <>
      <div className='mm:hidden' onClick={() => navigate(-1)}>
        <img src={leftArrow} className='absolute top-4 left-4' alt='*' />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='mm:max-w-[400px] w-full pb-8'
      >
        <h1 className='mb-8 mm:mb-12 text-3xl mm:text-[32px] font-medium text-center'>
          Авторизация
        </h1>
        <div>
          <p className='font-bold mb-2'>Ваш email</p>
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
              src={call}
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
          <p className='font-bold mb-2'>Пароль</p>
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
          // onClick={(e) => {
          //   e.preventDefault();
          //   setModalOpen(true);
          //   setModalContent('inCorrectNumber');
          // }}
          type='submit'
          className='p-[17px] rounded-lg bg-black text-white flex justify-center items-center w-full font-bold hover:opacity-80 duration-150'
        >
          Войти
        </button>
        <p className='font-medium mt-5 mb-2 text-center'>Впервые у нас?</p>
        <NavLink
          className='text-[20px] font-semibold flex justify-center text-colYellow'
          to='/auth/sign-up'
        >
          Зарегистрироваться
        </NavLink>
      </form>
      <Modal isOpen={modalOpen} onClose={closeModal} content={modalContent} />
    </>
  );
};

export default SignIn;
