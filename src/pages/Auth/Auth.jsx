import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/icons/logo2.svg';
import back from '../../assets/icons/back.svg';
import call from '../../assets/icons/call2.svg';

const Auth = () => {
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
      <div className='bg-black mm:bg-white w-full h-full mm:w-3/5 lg:w-4/6 flex flex-col justify-around items-center px-4 py-20'>
        <NavLink to='/' className='mm:hidden mb-10'>
          <img src={logo} alt='*' />
        </NavLink>
        <h1 className='hidden mm:block text-[32px] font-medium'>Регистрация</h1>
        <form className='max-w-[400px] w-full'>
          <div className='mb-8 relative'>
            <input
              className='w-full border border-colBgGray2 p-[15px_20px_15px_44px] rounded-lg focus:border-black focus:outline-none'
              type='number'
              placeholder='Введите ваш номер'
            />
            <img
              className='absolute top-[15px] left-[10px]'
              src={call}
              alt='*'
            />
          </div>
          <NavLink
            to='step-1'
            className='p-[17px] rounded-lg bg-colYellow mm:bg-black mm:text-white flex justify-center items-center w-full font-bold hover:opacity-80 duration-150'
          >
            Зарегистрироваться
          </NavLink>
        </form>
        <div className='text-center'>
          <p className='text-[15px] text-white mm:text-black font-medium mt-5 mb-1'>
            У вас есть аккаунт?
          </p>
          <NavLink className='text-xl text-colYellow' to='/login'>
            Войти
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Auth;
