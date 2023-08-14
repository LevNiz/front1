import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/icons/logo2.svg';
import logoMobile from '../../assets/icons/logo3.svg';
import lock from '../../assets/icons/lock.svg';
import call from '../../assets/icons/call3.svg';
import back from '../../assets/icons/back.svg';
import showPass from '../../assets/icons/show-pass.svg';
import { useState } from 'react';
import Modal from '../Modals/Modal';

const Login = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState();
  const [visiblePass, setVisiblePass] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className='flex w-full h-screen'>
      <div className='hidden relative w-2/5 lg:w-2/6 bg-black mm:flex justify-center items-center'>
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
      <div className='w-full mm:w-3/5 lg:w-4/6 flex flex-col mm:justify-around items-center px-4 py-3 xs:py-10 mm:py-20'>
        <NavLink className='mm:hidden mb-10' to='/'>
          <img src={logoMobile} alt='*' />
        </NavLink>
        <h1 className='hidden mm:block text-[32px] font-medium'>Авторизация</h1>
        <form className='mm:max-w-[400px] w-full pb-8'>
          <div>
            <p className='font-bold mb-2'>Номер телефона</p>
            <div className='mb-6 relative'>
              <input
                className='w-full border border-colGray2 p-3 mm:p-[15px_20px_15px_44px] rounded-lg focus:border-black focus:outline-none'
                type='text'
                placeholder='Номер телефона'
              />
              <img
                className='absolute top-[15px] left-[10px] hidden mm:block'
                src={call}
                alt='*'
              />
            </div>
          </div>
          <div>
            <p className='font-bold mb-2'>Пароль</p>
            <div className='mb-4 relative'>
              <input
                className='w-full border border-colGray2 p-3 mm:p-[15px_20px_15px_44px] rounded-lg focus:border-black focus:outline-none'
                type={`${visiblePass ? 'text' : 'password'}`}
                placeholder='Пароль'
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
                  } absolute top-[11px] -rotate-[35deg] w-7 h-[1.5px] bg-colGray3`}
                ></span>
              </div>
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
