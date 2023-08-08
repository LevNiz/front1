import { NavLink } from 'react-router-dom';
import logo from '../../assets/icons/logo2.svg';
import call from '../../assets/icons/call2.svg';

const Auth = () => {
  return (
    <div className='flex w-full h-screen'>
      <div className='w-2/6 bg-black flex justify-center items-center'>
        <img src={logo} alt='*' />
      </div>
      <div className='w-4/6 flex flex-col justify-around items-center py-20'>
        <h1 className='text-[32px] font-medium'>Регистрация</h1>
        <form className='max-w-[400px] w-full'>
          <div className='mb-8 relative'>
            <input
              className='w-full border border-black p-[15px_20px_15px_44px] rounded-lg focus:outline-none'
              type='number'
              placeholder='Введите ваш номер'
            />
            <img className='absolute top-[15px] left-[10px]' src={call} alt="*" />
          </div>
          <NavLink className='p-[17px] rounded-lg bg-black text-white flex justify-center items-center w-full font-bold hover:opacity-80 duration-150'>
            Зарегистрироваться
          </NavLink>
        </form>
        <div className='text-center'>
          <p className='text-[15px] font-medium mb-1'>У вас есть аккаунт?</p>
          <NavLink className='text-xl text-colYellow' to='/login'>
            Войти
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Auth;
