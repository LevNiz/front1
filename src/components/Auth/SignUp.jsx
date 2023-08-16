import { NavLink, useNavigate } from 'react-router-dom';
import location from '../../assets/icons/location2.svg';
import profile from '../../assets/icons/profile.svg';
import lock from '../../assets/icons/lock.svg';
import leftArrow from '../../assets/icons/arrow-left.svg';
import showPass from '../../assets/icons/show-pass.svg';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

const SignUp = () => {
  const [visiblePass, setVisiblePass] = useState(false);
  const [visiblePassConfirm, setVisiblePassConfirm] = useState(false);
  const [password, setPassword] = useState('');
  const [passValid, setPassValid] = useState(true);
  const [hasUpperAndLowercase, setHasUpperAndLowercase] = useState(false);
  const [hasNumbercase, setHasNumbercase] = useState(false);
  const [hasSymbolcase, setHasSymbolcase] = useState(false);

  const navigate = useNavigate();

  const handlePassword = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setPassValid(validatePassword(newPassword));
  };

  const validatePassword = (password) => {
    const uppercaseLowercaseRegex = /^(?=.*[a-z])(?=.*[A-Z])/;
    const digitRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/;

    const hasUppercaseLowercase = uppercaseLowercaseRegex.test(password);
    const hasDigit = digitRegex.test(password);
    const hasSpecialChar = specialCharRegex.test(password);

    setHasUpperAndLowercase(hasUppercaseLowercase);
    setHasNumbercase(hasDigit);
    setHasSymbolcase(hasSpecialChar);

    return hasUppercaseLowercase && hasDigit && hasSpecialChar;
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <div className='mm:hidden' onClick={() => navigate('/')}>
        <img
          className='absolute top-4 left-4 cursor-pointer'
          src={leftArrow}
          alt='*'
        />
      </div>
      <h1 className='text-3xl mm:text-[32px] font-medium mb-8'>Регистрация</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='mm:max-w-[400px] w-full'
      >
        <div>
          <p className='font-bold mb-2'>ФИО</p>
          <div className='mb-6 relative'>
            <input
              className='w-full border border-colGray2 p-[16px] mm:p-[15px_20px_15px_44px] rounded-lg focus:border-black focus:outline-none'
              placeholder='Полное имя'
              {...register('fullName', {
                required: 'Поле обязательно к заполнению!',
              })}
            />
            <img
              className='absolute top-[15px] left-[10px] hidden mm:block'
              src={profile}
              alt='*'
            />
            {errors?.fullName && <p>{errors?.fullName.message || 'Error!'}</p>}
          </div>
        </div>
        <div>
          <p className='font-bold mb-2'>Ваш email</p>
          <div className='mb-6 relative'>
            <input
              className='w-full border border-colGray2 p-[16px] mm:p-[15px_20px_15px_44px] rounded-lg focus:border-black focus:outline-none'
              type='email'
              placeholder='Введите ваш email'
              {...register('email', {
                required: 'Поле обязательно к заполнению!',
              })}
            />
            <img
              className='absolute top-[15px] left-[10px] hidden mm:block'
              src={profile}
              alt='*'
            />
            {errors?.email && <p>{errors?.email.message || 'Error!'}</p>}
          </div>
        </div>
        <div>
          <p className='font-bold mb-2'>Адрес</p>
          <div className='mb-6 relative'>
            <input
              className='w-full border border-colGray2 p-[16px] mm:p-[15px_20px_15px_44px] rounded-lg focus:border-black focus:outline-none'
              placeholder='Адрес проживания'
              {...register('address', {
                required: 'Поле обязательно к заполнению!',
              })}
            />
            <img
              className='absolute top-[15px] left-[10px] hidden mm:block'
              src={location}
              alt='*'
            />
            {errors?.address && <p>{errors?.address.message || 'Error!'}</p>}
          </div>
        </div>
        <div>
          <p className='font-bold mb-2'>Пароль</p>
          <div className='mb-6 relative'>
            <input
              className={`w-full border ${
                passValid ? 'border-colGray2' : 'border-red-500'
              } p-3 mm:p-[15px_20px_15px_44px] rounded-lg focus:border-black focus:outline-none`}
              type={`${visiblePass ? 'text' : 'password'}`}
              placeholder='Пароль'
              value={password}
              onChange={handlePassword}
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
                } absolute top-[11px] -rotate-[35deg] w-7 h-[1.5px] bg-colGray3`}
              ></span>
            </div>
          </div>
        </div>
        <div>
          <p className='font-bold mb-2'>Подтвердить пароль</p>
          <div className='mb-6 relative'>
            <input
              className='w-full border border-colGray2 p-[15px_44px_15px_44px] rounded-lg focus:border-black focus:outline-none'
              type={`${visiblePassConfirm ? 'text' : 'password'}`}
              placeholder='Подтвердить пароль'
            />
            <img
              className='absolute top-[15px] left-[10px]'
              src={lock}
              alt='*'
            />
            <div
              onClick={() => setVisiblePassConfirm(!visiblePassConfirm)}
              className='absolute top-[15px] right-[10px] cursor-pointer'
            >
              <img src={showPass} alt='*' />
              <span
                className={`${
                  visiblePassConfirm ? 'block' : 'hidden'
                } absolute top-[11px] -rotate-[35deg] w-7 h-[1.5px] bg-colGray3`}
              ></span>
            </div>
          </div>
        </div>
        <div className='mb-7'>
          <div className='flex items-center my-2'>
            <span
              className={`min-w-[10px] h-[10px] rounded-full ${
                hasUpperAndLowercase ? 'bg-colYellow' : 'bg-colGray2'
              }`}
            ></span>
            <p className='text-[#AAA] ml-3 text-xs sm:text-base'>
              Прописные и строчные латинские буквы
            </p>
          </div>
          <div className='flex items-center my-2'>
            <span
              className={`min-w-[10px] h-[10px] rounded-full ${
                hasNumbercase ? 'bg-colYellow' : 'bg-colGray2'
              }`}
            ></span>
            <p className='text-[#AAA] ml-3 text-xs sm:text-base'>
              Минимум одна цифра
            </p>
          </div>
          <div className='flex items-center my-2'>
            <span
              className={`min-w-[10px] h-[10px] rounded-full ${
                hasSymbolcase ? 'bg-colYellow' : 'bg-colGray2'
              }`}
            ></span>
            <p className='text-[#AAA] ml-3 text-xs sm:text-base'>
              Минимум один спецсимвол
            </p>
          </div>
        </div>
        <div className='mb-8'>
          <input
            className='hidden'
            type='checkbox'
            id='checkbox'
            placeholder='Адрес проживания'
            {...register('privacyPolicy', {
              required: 'Поле обязательно к заполнению!',
            })}
          />
          <label
            htmlFor='checkbox'
            className='text-sm flex items-center cursor-pointer'
          >
            <div className='w-7 h-7 mr-2 flex justify-center items-center bg-yellow-300 border border-white rounded'>
              {isValid ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  xmlnsXlink='http://www.w3.org/1999/xlink'
                  width='20'
                  height='20'
                  viewBox='0 0 30 30.000001'
                  version='1.0'
                >
                  <defs>
                    <clipPath id='id1'>
                      <path d='M 2.328125 4.222656 L 27.734375 4.222656 L 27.734375 24.542969 L 2.328125 24.542969 Z M 2.328125 4.222656 ' />
                    </clipPath>
                  </defs>
                  <g clipPath='url(#id1)'>
                    <path
                      fill='#fff'
                      d='M 27.5 7.53125 L 24.464844 4.542969 C 24.15625 4.238281 23.65625 4.238281 23.347656 4.542969 L 11.035156 16.667969 L 6.824219 12.523438 C 6.527344 12.230469 6 12.230469 5.703125 12.523438 L 2.640625 15.539062 C 2.332031 15.84375 2.332031 16.335938 2.640625 16.640625 L 10.445312 24.324219 C 10.59375 24.472656 10.796875 24.554688 11.007812 24.554688 C 11.214844 24.554688 11.417969 24.472656 11.566406 24.324219 L 27.5 8.632812 C 27.648438 8.488281 27.734375 8.289062 27.734375 8.082031 C 27.734375 7.875 27.648438 7.679688 27.5 7.53125 Z M 27.5 7.53125 '
                      fillOpacity='1'
                      fillRule='nonzero'
                    />
                  </g>
                </svg>
              ) : (
                ''
              )}
            </div>
            Политика конфиденциальности
          </label>
        </div>
        <button
          disabled={!isValid}
          type='submit'
          className={`${
            isValid ? 'hover:opacity-80' : 'opacity-50 cursor-not-allowed'
          } p-[17px] rounded-lg bg-black text-white flex justify-center items-center w-full font-bold duration-150`}
        >
          Зарегистрироваться
        </button>
      </form>
      <div className='text-center'>
        <p className='text-base text-black font-medium mt-5 mb-1'>
          У вас есть аккаунт?
        </p>
        <NavLink to='/auth/sign-in' className='text-xl text-colYellow'>
          Войти
        </NavLink>
      </div>
    </>
  );
};

export default SignUp;
