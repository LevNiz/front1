import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/icons/logo2.svg';
import lock from '../../assets/icons/lock.svg';
import call from '../../assets/icons/call3.svg';
import back from '../../assets/icons/back.svg';
import { useState } from 'react';
import Modal from '../Modals/Modal';

const Login = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState();

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className='flex w-full h-screen'>
      <div className='relative w-2/6 bg-black flex justify-center items-center'>
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
      <div className='w-4/6 flex flex-col justify-around items-center py-20'>
        <h1 className='text-[32px] font-medium'>Авторизация</h1>
        <form className='max-w-[400px] w-full'>
          <div>
            <p className='font-bold mb-2'>Номер телефона</p>
            <div className='mb-6 relative'>
              <input
                className='w-full border border-colGray2 p-[15px_20px_15px_44px] rounded-lg focus:border-black focus:outline-none'
                type='text'
                placeholder='Номер телефона'
              />
              <img
                className='absolute top-[15px] left-[10px]'
                src={call}
                alt='*'
              />
            </div>
          </div>
          <div>
            <p className='font-bold mb-2'>Пароль</p>
            <div className='mb-4 relative'>
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
          <NavLink
            className='text-colGray3 text-sm font-medium flex justify-end mb-6'
            to='#'
          >
            Забыли пароль?
          </NavLink>
          <button
            onClick={(e) => {
              e.preventDefault();
              setModalOpen(true);
              setModalContent('inCorrectNumber');
            }}
            className='p-[17px] rounded-lg bg-black text-white flex justify-center items-center w-full font-bold hover:opacity-80 duration-150'
          >
            Войти
          </button>
          <p className='font-medium mt-5 mb-2 text-center'>Впервые у нас?</p>
          <NavLink
            className='text-[20px] font-semibold flex justify-center text-colYellow'
            to='/register'
          >
            Зарегистрироваться
          </NavLink>
        </form>
      </div>
      <Modal isOpen={modalOpen} onClose={closeModal} content={modalContent} />
    </div>
  );
};

export default Login;
