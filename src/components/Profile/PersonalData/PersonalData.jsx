import { useEffect, useState } from 'react';
import location from './../../../assets/icons/location2.svg';
import profile from './../../../assets/icons/profile.svg';
import call from './../../../assets/icons/call3.svg';
import email from './../../../assets/icons/email.svg';
import noImg from './../../../assets/images/no-ava.jpeg';
import errorImg from './../../../assets/images/error.svg';
import { useSelector } from 'react-redux';
import { fetchUser } from '../../../api/client';
import { Controller, useForm } from 'react-hook-form';
import { fetchCities, fetchCountries } from '../../../api/tempAPI';
import { ContentLoading } from '../../../helpers/Loader/Loader';
import ReactFlagsSelect from 'react-flags-select';
import Select from 'react-select';
import { UpdateProfile } from '../../../api/user';
import { NavLink } from 'react-router-dom';

const PersonalData = () => {
  const userID = useSelector((state) => state?.user?.userID);
  const [userData, setUserData] = useState();
  const [error, setError] = useState(false);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [size, setSize] = useState(window.innerWidth);

  window.addEventListener('resize', function () {
    setSize(window.innerWidth);
  });

  const {
    register,
    setValue,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: async () => {
      setIsLoading(true);
      const { success, data } = await fetchUser(userID);
      if (success) {
        setUserData(data);
        const cityDefaults = data?.city
          ? {
              value: data.city.id,
              label: data.city.nameRu,
            }
          : {};
        const countryDefaults = data?.country
          ? {
              id: data.country.id,
              code: data.country.code,
            }
          : {};
        setSelectedCountry(countryDefaults?.code);
        setIsLoading(false);
        return {
          fullName: data?.fullname,
          phone: data?.phone,
          email: data?.login,
          country: countryDefaults,
          city: cityDefaults,
          address: data?.address,
        };
      } else {
        setIsLoading(false);
        setError(true);
      }
    },
  });

  const fetchAndSetData = async (fetchFunction, setDataFunction) => {
    const { success, data } = await fetchFunction();
    if (success) {
      setDataFunction(data);
    }
  };

  useEffect(() => {
    fetchAndSetData(fetchCountries, setCountries);
    fetchAndSetData(fetchCities, setCities);
  }, []);

  const countrySelect = watch('country');
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

  const onSubmit = (data) => {
    (async () => {
      setIsLoading(false);
      const { success } = await UpdateProfile(userID, data);
      if (success) {
        setIsLoading(true);
      }
      setIsLoading(true);
    })();
  };

  return (
    <>
      {isLoading ? (
        <ContentLoading extraStyle='85vh' />
      ) : error ? (
        <div className='flex justify-center items-center w-full pt-10 sm:pt-24'>
          <div>
            <img className='mx-auto w-24 sm:w-40' src={errorImg} alt='*' />
            <h4 className='text-xl sm:text-2xl font-medium py-6 sm:py-12 text-center'>
              Произошла ошибка, повторите попытку позже!
            </h4>
            <NavLink
              to='/'
              className='max-w-[255px] mx-auto w-full flex justify-center items-center bg-black h-[48px] font-medium text-white rounded-[10px] hover:opacity-80 duration-150'
            >
              Перейти на главную
            </NavLink>
          </div>
        </div>
      ) : (
        <div className='py-5 sm:pl-5 lg:px-12 w-full'>
          <div className='flex flex-col items-center sm:flex-row'>
            <div className='relative max-w-[110px] border border-colGray2 min-w-[110px] h-[110px] overflow-hidden rounded-full mr-3 sm:mr-6'>
              <input className='hidden' accept='image/*' type='file' id='ava' />
              <label className='cursor-pointer' htmlFor='ava'>
                <img
                  className='w-full h-full object-cover'
                  src={userData?.avatar ? userData?.avatar : noImg}
                  alt='*'
                />
                <span className='absolute bottom-2 right-4 w-6 h-6 flex justify-center items-center rounded-full text-green-500 text-3xl bg-white'>
                  +
                </span>
              </label>
            </div>
            <div className='flex flex-col justify-center mt-2 sm:mt-0 text-center sm:text-left'>
              <h4 className='text-lg sm:text-xl font-medium sm:font-bold'>
                {userData?.fullname}
              </h4>
              <p className='text-sm sm:font-medium'>{userData?.city?.nameRu}</p>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='grid lg:grid-cols-2 gap-4 lg:gap-8 mt-6 sm:mt-12'>
              <div>
                <p className='font-bold mb-2'>ФИО</p>
                <div className='relative'>
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
                </div>
              </div>
              <div>
                <p className='font-bold mb-2'>Номер телефона</p>
                <div className='relative'>
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
                </div>
              </div>
              <div>
                <p className='font-bold mb-2'>Электронная почта</p>
                <div className='relative'>
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
                </div>
              </div>
              <div>
                <p className='font-bold mb-2'>Место проживания</p>
                <div className='relative'>
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
                </div>
              </div>
              <div>
                <p className='font-bold mb-2'>Страна</p>
                <div className='relative mb-1'>
                  <Controller
                    name='country'
                    control={control}
                    rules={{ required: 'Поле обязательно к заполнению!' }}
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
              <div>
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
            </div>
            <div className='flex justify-end mt-6 sm:mt-12'>
              <button className='sm:max-w-[255px] sm:ml-5 w-full bg-black h-[50px] font-semibold text-white rounded-[10px] hover:opacity-80 duration-150'>
                Сохранить
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default PersonalData;
