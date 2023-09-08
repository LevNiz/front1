import { NavLink, useNavigate } from 'react-router-dom';
import location from '../../assets/icons/location2.svg';
import profile from '../../assets/icons/profile.svg';
import lock from '../../assets/icons/lock.svg';
import call from '../../assets/icons/call3.svg';
import leftArrow from '../../assets/icons/arrow-left.svg';
import showPass from '../../assets/icons/show-pass.svg';
import { Controller, useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import Select from 'react-select';
import ReactFlagsSelect from 'react-flags-select';
import { fetchCities, fetchCountries } from '../../api/tempAPI';
import { registerUser } from '../../api/user';
import { useDispatch } from 'react-redux';
import { Loading } from '../../helpers/Loader/Loader';

const SignUp = () => {
  const [visiblePass, setVisiblePass] = useState(false);
  const [visiblePassConfirm, setVisiblePassConfirm] = useState(false);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [size, setSize] = useState(window.innerWidth);

  window.addEventListener('resize', function () {
    setSize(window.innerWidth);
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    control,
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const countrySelect = watch('country');
  const password = watch('password', '');
  const confirmPass = watch('confirmPassword', '');
  const privacyPolicy = watch('privacyPolicy', '');

  const hasLowerCaseUpperCase = /^(?=.*[a-z])(?=.*[A-Z])/.test(password);
  const hasNumber = /^(?=.*\d)/.test(password);
  const hasSpecialChar = /^(?=.*[@$!%*?&#])/.test(password);
  const hasSamePassword = password !== '' && password === confirmPass;

  const getCountriesFetch = async () => {
    const { success, data } = await fetchCountries();
    if (success) {
      setCountries(data);
    }
  };

  const getCitiesFetch = async () => {
    const { success, data } = await fetchCities();
    if (success) {
      setCities(data);
    }
  };

  useEffect(() => {
    getCountriesFetch();
    getCitiesFetch();
  }, []);

  const onSubmit = async (data) => {
    setIsLoading(true);
    const { success } = await registerUser(dispatch, data);
    if (success) {
      setIsLoading(false);
      navigate('/');
    }
    setIsLoading(false);
  };

  const countryNamesInRussian = {};

  countries.forEach((country) => {
    countryNamesInRussian[country?.code] = country.nameRu;
  });

  const filteredCities = cities?.filter(
    (el) => el?.country?.code === selectedCountry
  );

  const cityOptions = filteredCities?.map((el) => ({
    value: el?.id,
    label: el?.nameRu,
  }));

  return (
    <>
      <div className='mm:hidden' onClick={() => navigate('/')}>
        <img className='cursor-pointer mb-5' src={leftArrow} alt='*' />
      </div>
      <h1 className='text-3xl mm:text-[32px] font-medium mb-8'>Регистрация</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='mm:max-w-[460px] w-full'
      >
        <div className='mb-4'>
          <p className='font-bold mb-2'>ФИО</p>
          <div className='relative mb-1'>
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
            {errors?.fullName && (
              <p className='text-red-500 mt-1 text-sm'>
                {errors?.fullName.message || 'Error!'}
              </p>
            )}
          </div>
        </div>
        <div className='mb-4'>
          <p className='font-bold mb-2'>Ваш email</p>
          <div className='relative mb-1'>
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
              src={profile}
              alt='*'
            />
            {errors?.email && (
              <p className='text-red-500 mt-1 text-sm'>
                {errors?.email.message || 'Error!'}
              </p>
            )}
          </div>
        </div>
        <div className='mb-4'>
          <p className='font-bold mb-2'>Ваш телефон</p>
          <div className='relative mb-1'>
            <input
              className='w-full border border-colGray2 p-[16px] mm:p-[15px_20px_15px_44px] rounded-lg focus:border-black focus:outline-none'
              placeholder='Введите ваш телефон'
              {...register('phone', {
                required: 'Поле обязательно к заполнению!',
                pattern: {
                  value: /^[0-9+]+$/,
                  message: 'Введите только цифры!',
                },
              })}
            />
            <img
              className='absolute top-[15px] left-[10px] hidden mm:block'
              src={call}
              alt='*'
            />
            {errors?.phone && (
              <p className='text-red-500 mt-1 text-sm'>
                {errors?.phone.message || 'Error!'}
              </p>
            )}
          </div>
        </div>
        <div className='mb-4'>
          <p className='font-bold mb-2'>Адрес</p>
          <div className='relative mb-1'>
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
            {errors?.address && (
              <p className='text-red-500 mt-1 text-sm'>
                {errors?.address.message || 'Error!'}
              </p>
            )}
          </div>
        </div>
        <div className='mb-4'>
          <p className='font-bold mb-2'>Страна</p>
          <div className='relative mb-1'>
            <Controller
              name='country'
              control={control}
              rules={{ required: 'Поле обязательно к заполнению!' }}
              defaultValue=''
              render={({ field }) => (
                <ReactFlagsSelect
                  selected={field.value?.code}
                  onSelect={(selectedOption) => {
                    field.onChange(selectedOption);
                    const selectedCountryObject = countries?.find(
                      (country) => country?.code === selectedOption
                    );

                    if (selectedCountryObject) {
                      setValue('country', selectedCountryObject);
                    }
                    setSelectedCountry(selectedOption);
                    setValue('city', '');
                  }}
                  countries={countries?.map((country) => country?.code)}
                  customLabels={countryNamesInRussian}
                  placeholder='Выберите страну'
                  searchable={true}
                  searchPlaceholder='Поиск...'
                  customStyle={{
                    padding: '11px 20px 11px 44px !important',
                  }}
                />
              )}
            />
            <img
              className='absolute top-[15px] left-[10px] hidden mm:block'
              src={location}
              alt='*'
            />
            {errors?.country && (
              <p className='text-red-500 mt-1 text-sm'>
                {errors?.country.message || 'Error!'}
              </p>
            )}
          </div>
        </div>
        <div className='mb-4'>
          <p className='font-bold mb-2'>Город</p>
          <div className='relative mb-1'>
            <Controller
              name='city'
              control={control}
              rules={{ required: 'Поле обязательно к заполнению!' }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={cityOptions}
                  placeholder='Выберите город'
                  isDisabled={!countrySelect}
                  onChange={(selectedOption) => {
                    field.onChange(selectedOption);
                  }}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      padding: size >= 576 ? '8px 8px 8px 34px' : '8px',
                    }),
                  }}
                />
              )}
            />
            <img
              className='absolute top-[15px] left-[10px] hidden mm:block'
              src={location}
              alt='*'
            />
            {errors?.city && (
              <p className='text-red-500 mt-1 text-sm'>
                {errors?.city.message || 'Error!'}
              </p>
            )}
          </div>
        </div>
        <div className='mb-4'>
          <p className='font-bold mb-2'>Пароль</p>
          <div className='relative mb-1'>
            <input
              className='w-full border border-colGray2 p-[16px] mm:p-[15px_20px_15px_44px] rounded-lg focus:border-black focus:outline-none'
              type={`${visiblePass ? 'text' : 'password'}`}
              placeholder='Пароль'
              {...register('password', {
                required: 'Поле обязательно к заполнению!',
                validate: (value) => {
                  if (!/^(?=.*[a-z])(?=.*[A-Z])/.test(value)) {
                    return 'Требуется хотя бы одна строчная и прописная буква!';
                  }
                  if (!/(?=.*\d)/.test(value)) {
                    return 'Требуется хотя бы одна цифра!';
                  }
                  if (!/(?=.*[@$!%*?&#])/.test(value)) {
                    return 'Требуется хотя бы один специальный символ!';
                  }
                  if (value.length < 6) {
                    return 'Минимальная длина пароля - 6 символов!';
                  }
                  return true;
                },
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
          {errors?.password && (
            <p className='text-red-500 text-sm'>
              {errors?.password.message || 'Error!'}
            </p>
          )}
        </div>
        <div className='mb-4'>
          <p className='font-bold mb-2'>Подтвердить пароль</p>
          <div className='relative mb-1'>
            <input
              className='w-full border border-colGray2 p-[16px] mm:p-[15px_20px_15px_44px] rounded-lg focus:border-black focus:outline-none'
              type={`${visiblePassConfirm ? 'text' : 'password'}`}
              placeholder='Подтвердить пароль'
              {...register('confirmPassword', {
                required: 'Поле обязательно к заполнению!',
                validate: (value) =>
                  value === password || 'Пароли не совпадают',
              })}
            />
            <img
              className='absolute top-[15px] left-[10px] hidden mm:block'
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
                } absolute top-[11px] -left-[2px] -rotate-[35deg] w-7 h-[1.5px] bg-colGray3`}
              ></span>
            </div>
          </div>
          {errors?.confirmPassword && (
            <p className='text-red-500 text-sm'>
              {errors?.confirmPassword.message || 'Error!'}
            </p>
          )}
        </div>
        <div className='mb-7'>
          <div className='flex items-center my-2'>
            <span
              className={`min-w-[10px] h-[10px] rounded-full ${
                hasLowerCaseUpperCase ? 'bg-colYellow' : 'bg-colGray2'
              }`}
            ></span>
            <p className='text-[#AAA] ml-3 text-xs sm:text-base'>
              Прописные и строчные латинские буквы
            </p>
          </div>
          <div className='flex items-center my-2'>
            <span
              className={`min-w-[10px] h-[10px] rounded-full ${
                hasNumber ? 'bg-colYellow' : 'bg-colGray2'
              }`}
            ></span>
            <p className='text-[#AAA] ml-3 text-xs sm:text-base'>
              Минимум одна цифра
            </p>
          </div>
          <div className='flex items-center my-2'>
            <span
              className={`min-w-[10px] h-[10px] rounded-full ${
                hasSpecialChar ? 'bg-colYellow' : 'bg-colGray2'
              }`}
            ></span>
            <p className='text-[#AAA] ml-3 text-xs sm:text-base'>
              Минимум один спецсимвол
            </p>
          </div>
          <div className='flex items-center my-2'>
            <span
              className={`min-w-[10px] h-[10px] rounded-full ${
                hasSamePassword ? 'bg-colYellow' : 'bg-colGray2'
              }`}
            ></span>
            <p className='text-[#AAA] ml-3 text-xs sm:text-base'>
              Пароли совпадают
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
              required: 'Обязательное согласие с политикой конфиденциальности!',
            })}
          />
          <label
            htmlFor='checkbox'
            className='text-sm flex items-center cursor-pointer'
          >
            <div className='w-7 h-7 mr-2 flex justify-center items-center bg-yellow-300 border border-white rounded'>
              {privacyPolicy ? (
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
            Я согласен (на) с
            <NavLink className='ml-1 underline' to='/' target='blank'>
              {' '}
              условиями пользовательского соглашения
            </NavLink>
          </label>
          {errors?.privacyPolicy && (
            <p className='text-red-500 text-xs mt-2'>
              {errors?.privacyPolicy.message || 'Error!'}
            </p>
          )}
        </div>
        <button
          type='submit'
          className='hover:opacity-80 p-[17px] rounded-lg bg-black text-white flex justify-center items-center w-full font-bold duration-150'
        >
          Зарегистрироваться
        </button>
      </form>
      <div className='text-center'>
        <p className='text-base text-colGray3 mt-5 mb-1'>
          У вас есть аккаунт?
        </p>
        <NavLink to='/auth/sign-in' className='text-xl font-medium'>
          Войти
        </NavLink>
      </div>
      {isLoading ? <Loading /> : ''}
    </>
  );
};

export default SignUp;
