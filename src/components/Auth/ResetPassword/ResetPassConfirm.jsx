import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../../assets/icons/logo2.svg';
import back from '../../../assets/icons/back.svg';
import leftArrow from '../../../assets/icons/arrow-left.svg';

const ResetPassConfirm = () => {
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
      <div className='w-full mm:w-3/5 flex flex-col justify-around items-center py-10 mm:py-20 px-4'>
        <form className='mm:max-w-[400px] w-full'>
          <div className='mm:hidden' onClick={() => navigate(-1)}>
            <img src={leftArrow} className='absolute top-4 left-4' alt='*' />
          </div>
          <h2 className='text-black text-2xl font-bold'>Введите код</h2>
          <p className='text-colGray3 my-4'>
            Введите код подтверждения, который мы только что отправили на ваш
            номер телефона
          </p>
          <div className='flex items-center my-12'>
            <input
              className='xs:w-[66px] w-[60px] h-[60px] xs:h-[60px] px-1 rounded-md bg-colBgGray2 text-center text-[22px] font-medium focus:outline-none mr-1 xs:mr-2 sm:mr-5'
              defaultValue='2'
              type='text'
              onInput={(e) =>
                (e.target.value = e.target.value.replace(/\D/, ''))
              }
            />
            <input
              className='xs:w-[66px] w-[60px] h-[60px] xs:h-[60px] px-1 rounded-md bg-colBgGray2 text-center text-[22px] font-medium focus:outline-none mr-1 xs:mr-2 sm:mr-5'
              defaultValue='1'
              type='text'
              onInput={(e) =>
                (e.target.value = e.target.value.replace(/\D/, ''))
              }
            />
            <input
              className='xs:w-[66px] w-[60px] h-[60px] xs:h-[60px] px-1 rounded-md bg-colBgGray2 text-center text-[22px] font-medium focus:outline-none mr-1 xs:mr-2 sm:mr-5'
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
          </div>
          <NavLink to='/reset-password/step-2' className='p-[17px] rounded-lg bg-black text-white flex justify-center items-center w-full font-bold hover:opacity-80 duration-150'>
            Подтвердить
          </NavLink>
          <div className='flex justify-center flex-wrap mt-12'>
            <p className='text-base text-black font-medium mr-2'>
              Не получили код?
            </p>
            <NavLink className='text-base text-colYellow' to='/login'>
              Отправить еще раз
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassConfirm;
