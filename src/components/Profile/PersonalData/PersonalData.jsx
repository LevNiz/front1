import { useEffect, useState } from 'react';
import location from './../../../assets/icons/location2.svg';
import profile from './../../../assets/icons/profile.svg';
import call from './../../../assets/icons/call3.svg';
import email from './../../../assets/icons/email.svg';
import noImg from './../../../assets/images/no-ava.jpeg';
import jwt_decode from 'jwt-decode';
import { useSelector } from 'react-redux';
import { fetchUser } from '../../../api/client';
import { Controller, useForm } from 'react-hook-form';
import { fetchCities, fetchCountries } from '../../../api/tempAPI';
import { ContentLoading } from '../../../helpers/Loader/Loader';
import ReactFlagsSelect from 'react-flags-select';
import Select from 'react-select';

const PersonalData = () => {
  const userToken = useSelector((state) => state?.user?.user?.access);
  const decoded = jwt_decode(userToken);
  const [userData, setUserData] = useState();
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
      const { success, data } = await fetchUser(decoded?.user_id);
      if (success) {
        setUserData(data);
        setIsLoading(false);
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
        return {
          fullName: data?.fullname,
          phone: data?.phone,
          email: data?.login,
          country: countryDefaults,
          city: cityDefaults,
          address: data?.address,
        };
      }
      setIsLoading(false);
    },
  });

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
    console.log(data);
  };

  return (
    <>
      {isLoading ? (
        <ContentLoading />
      ) : (
        <div className='py-5 pl-3 sm:pl-5 lg:px-12 w-full'>
          <div className='flex'>
            <div className='relative sm:max-w-[110px] max-w-[80px] border border-colGray2 sm:min-w-[110px] min-w-[80px] h-[80px] sm:h-[110px] overflow-hidden rounded-full mr-3 sm:mr-6'>
              <input className='hidden' accept='image/*' type='file' id='ava' />
              <label className='cursor-pointer' htmlFor='ava'>
                <img
                  className='w-full h-full object-cover'
                  src={userData?.avatar ? userData?.avatar : noImg}
                  alt='*'
                />
                <span className='absolute bottom-2 right-5 w-5 h-5 flex justify-center items-center rounded-full text-green-500 text-3xl bg-white'>
                  +
                </span>
              </label>
            </div>
            <div className='flex flex-col justify-center'>
              <h4 className='text-lg sm:text-xl font-medium sm:font-bold'>
                {userData?.fullname}
              </h4>
              <p className='text-sm sm:font-medium'>{userData?.city?.nameRu}</p>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='grid lg:grid-cols-2 gap-4 lg:gap-8 mt-12'>
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
