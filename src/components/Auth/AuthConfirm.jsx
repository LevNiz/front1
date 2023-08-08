import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/icons/logo2.svg';
import back from '../../assets/icons/back.svg';

const AuthConfirm = () => {
  const navigate = useNavigate();

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
        <form className='max-w-[400px] w-full'>
          <h2 className='text-black text-2xl font-bold'>Введите код</h2>
          <p className='text-colGray3 my-4'>
            Введите код подтверждения, который мы только что отправили на ваш
            номер телефона
          </p>
          <div className='flex items-center my-12'>
            <input
              className='w-[66px] h-[60px] px-1 rounded-md bg-colBgGray2 text-center text-[22px] font-medium focus:outline-none mr-5'
              defaultValue='2'
              type='text'
              onInput={(e) =>
                (e.target.value = e.target.value.replace(/\D/, ''))
              }
            />
            <input
              className='w-[66px] h-[60px] px-1 rounded-md bg-colBgGray2 text-center text-[22px] font-medium focus:outline-none mr-5'
              defaultValue='1'
              type='text'
              onInput={(e) =>
                (e.target.value = e.target.value.replace(/\D/, ''))
              }
            />
            <input
              className='w-[66px] h-[60px] px-1 rounded-md bg-colBgGray2 text-center text-[22px] font-medium focus:outline-none mr-5'
              defaultValue='9'
              type='text'
              onInput={(e) =>
                (e.target.value = e.target.value.replace(/\D/, ''))
              }
            />
            <input
              className='w-[66px] h-[60px] px-1 rounded-md bg-colBgGray2 text-center text-[22px] font-medium focus:outline-none'
              defaultValue='7'
              type='text'
              onInput={(e) =>
                (e.target.value = e.target.value.replace(/\D/, ''))
              }
            />
          </div>
          <div className='font-medium text-center font-[Outfit]'>02:39</div>
          <p className='text-center text-colGray my-10 text-sm'>
            Не получили код?{' '}
            <NavLink to='#' className='text-black font-bold'>
              Отправить еще раз
            </NavLink>
          </p>
          <button className='p-[17px] rounded-lg bg-black text-white flex justify-center items-center w-full font-bold hover:opacity-80 duration-150'>
            Подтвердить
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthConfirm;
