import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { ContentLoading } from '../Loader/Loader';
import inCorrectImg from './../../assets/images/404.svg';
import back from './../../assets/icons/arrow-left.svg';
import { fetchAddresses, postAddress } from '../../api/addresses';
import { fetchDepots } from '../../api/depots';

const ModalAddress = ({ isOpen, onClose, onSelectAddress, onReceiver }) => {
  const { cities } = useSelector((state) => state?.cities);
  const { countries } = useSelector((state) => state?.countries);
  const { depots } = useSelector((state) => state?.depots);
  const { loading, error, addresses } = useSelector(
    (state) => state?.addresses
  );
  const { userID } = useSelector((state) => state?.user);
  const dispatch = useDispatch();

  const [addressForm, setAddressForm] = useState(true);
  const [addressType, setAddressType] = useState('custom');
  const [selectedCountry, setSelectedCountry] = useState('');

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    register,
  } = useForm();

  const countrySelect = watch('country');

  const filteredCities = cities?.filter(
    (el) => el?.country?.id === selectedCountry
  );

  const cityOptions = filteredCities?.map((el) => ({
    value: el?.id,
    label: el?.nameRu,
  }));

  const onSubmit = async (data) => {
    const { success } = await postAddress(data, userID);
    if (success) {
      await fetchAddresses(userID, dispatch);
      setAddressForm(true);
    }
  };

  useEffect(() => {
    async () => {
      await fetchDepots(dispatch);
    };
  }, [dispatch]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center z-[999999]'>
      <div
        onClick={onClose}
        className='absolute inset-0 bg-gray-800 opacity-50'
      ></div>
      <div className='bg-white p-4 md:p-8 md:rounded-md h-screen md:h-[90vh] shadow-md z-10 md:max-w-[90%] w-full text-center relative overflow-hidden overflow-y-scroll'>
        {addressForm ? (
          <>
            <div className='flex justify-between items-center pt-5 md:pt-0 mb-10'>
              <h3 className='hidden md:block text-2xl font-medium'>
                Выберите адрес
              </h3>
              <button
                onClick={() => setAddressForm(false)}
                className='bg-black text-white py-3 px-6 font-medium rounded-md hover:opacity-70 duration-100'
              >
                + Добавить адрес
              </button>
              <div
                onClick={onClose}
                className='md:hidden text-4xl cursor-pointer absolute top-9 md:top-4 right-7'
              >
                &times;
              </div>
            </div>
            {loading ? (
              <ContentLoading extraStyle='380px' />
            ) : error ? (
              'Error'
            ) : addresses?.length ? (
              <div className='grid xl:grid-cols-4 dd:grid-cols-3 mm:grid-cols-2 gap-4 md:h-full'>
                {addresses?.map((el) => (
                  <div
                    key={el?.id}
                    className='border border-gray-300 rounded-md p-4 text-left h-max'
                  >
                    <div className='flex flex-col space-y-2'>
                      <div>
                        <p className='text-xs opacity-50'>Имя получателя</p>
                        <h4 className='text-sm border-b-gray-300 border-b pb-1'>
                          {el?.receiverName || 'Не указана'}
                        </h4>
                      </div>
                      <div>
                        <p className='text-xs opacity-50'>Номер телефона</p>
                        <h4 className='text-sm border-b-gray-300 border-b pb-1'>
                          {el?.phone || 'Не указана'}
                        </h4>
                      </div>
                      <div>
                        <p className='text-xs opacity-50'>Тип адреса</p>
                        <h4 className='text-sm border-b-gray-300 border-b pb-1'>
                          {el?.type === 'custom'
                            ? 'custom'
                            : el?.type === 'depot'
                            ? 'Пункт выдачи GivBox'
                            : '' || 'Не указана'}
                        </h4>
                      </div>
                      <div>
                        <p className='text-xs opacity-50'>Город, страна</p>
                        <h4 className='text-sm border-b-gray-300 border-b pb-1'>
                          {el?.city?.nameRu + ', ' + el?.country?.nameRu ||
                            'Не указана'}
                        </h4>
                      </div>
                      <div>
                        <p className='text-xs opacity-50'>Адрес</p>
                        <h4 className='text-sm border-b-gray-300 border-b pb-1'>
                          {el?.address || 'Не указана'}
                        </h4>
                      </div>
                      <div>
                        <p className='text-xs opacity-50'>Доп. по адресу</p>
                        <h4 className='text-sm border-b-gray-300 border-b pb-1'>
                          {el?.nameAddress || 'Не указана'}
                        </h4>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        onSelectAddress(el?.id);
                        onClose();
                        onReceiver({
                          receiverName: el?.receiverName,
                          receiverPhone: el?.phone,
                        });
                      }}
                      className='bg-colYellow hover:opacity-70 duration-200 w-full p-2 rounded-md mt-5 text-sm font-medium'
                    >
                      Выбрать
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className='text-center max-w-[320px] min-h-[218px] mx-auto pt-20'>
                <img className='mx-auto mb-5' src={inCorrectImg} alt='*' />
                <h3 className='text-xl font-medium max-w-[260px] mx-auto'>
                  Здесь пока пусто!
                </h3>
                <p className='text-sm opacity-75 max-w-[260px] mx-auto my-2'>
                  Нажав на кнопку ниже, вы можете добавить свои адреса.
                </p>
              </div>
            )}
          </>
        ) : (
          <>
            <img
              className='w-6 cursor-pointer sm:absolute top-5 mt-5 md:mt-0 sm:top-6 left-auto sm:left-8'
              src={back}
              alt='*'
              onClick={() => setAddressForm(true)}
            />
            <h2 className='text-xl font-medium mt-3 sm:mt-0 mb-5'>
              Добавить новый адрес
            </h2>
            {loading ? (
              <ContentLoading extraStyle='380px' />
            ) : (
              <form className='pt-5 flex flex-col justify-between'>
                <div className='grid lg:grid-cols-3 ld:grid-cols-2 gap-5 text-left'>
                  <div>
                    <p className='font-medium mb-2'>Имя получателя</p>
                    <input
                      className='w-full border border-colGray2 p-[14px] rounded-[4px] focus:border-black focus:outline-none'
                      placeholder='Введите имя получателя'
                      {...register('receiverName', {
                        required: 'Поле обязательно к заполнению!',
                      })}
                    />
                    {errors?.receiverName && (
                      <p className='text-red-500 mt-1 text-sm'>
                        {errors?.receiverName?.message ||
                          'Поле обязательно к заполнению!'}
                      </p>
                    )}
                  </div>
                  <div>
                    <p className='font-medium mb-2'>Номер телефона</p>
                    <input
                      className='w-full border border-colGray2 p-[16px] mm:p-[14px] rounded-[4px] focus:border-black focus:outline-none'
                      placeholder='Номер телефона'
                      type='tel'
                      {...register('phone', {
                        required: 'Поле обязательно к заполнению!',
                        pattern: {
                          value: /^[\d()+ -]+$/,
                          message: 'Введите только цифры!',
                        },
                      })}
                    />
                    {errors?.phone && (
                      <p className='text-red-500 mt-1 text-sm'>
                        {errors?.phone?.message ||
                          'Поле обязательно к заполнению!'}
                      </p>
                    )}
                  </div>
                  <div className='lg:col-span-3 ld:col-span-2'>
                    <p className='font-medium mb-2'>Тип адреса</p>
                    <div className='flex items-center'>
                      <label
                        onClick={() => setAddressType('custom')}
                        className='mr-3 flex items-center'
                      >
                        <Controller
                          name='type'
                          control={control}
                          checked
                          defaultValue='custom'
                          rules={{
                            required: 'Поле обязательно к заполнению!',
                          }}
                          render={({ field }) => (
                            <input
                              type='radio'
                              {...field}
                              value='custom'
                              defaultChecked
                            />
                          )}
                        />
                        <span className='pl-1'>Кастомный</span>
                      </label>
                      <label
                        onClick={() => setAddressType('depot')}
                        className='mr-3 flex items-center'
                      >
                        <Controller
                          name='type'
                          control={control}
                          defaultValue='depot'
                          rules={{
                            required: 'Поле обязательно к заполнению!',
                          }}
                          render={({ field }) => (
                            <input type='radio' {...field} value='depot' />
                          )}
                        />
                        <span className='pl-1'>Пункт выдачи GivBox</span>
                      </label>
                    </div>
                  </div>
                  {addressType === 'custom' ? (
                    <>
                      <div>
                        <p className='font-medium mb-2'>Страна</p>
                        <div className='relative'>
                          <Controller
                            name='country'
                            control={control}
                            rules={{
                              required: 'Поле обязательно к заполнению!',
                            }}
                            render={({ field }) => (
                              <Select
                                {...field}
                                placeholder='Выберите страну'
                                options={countries?.map((country) => ({
                                  value: country?.id,
                                  label: (
                                    <div
                                      key={country?.country}
                                      className='flex items-center'
                                    >
                                      <img
                                        src={country?.icon}
                                        alt={country?.nameRu}
                                        className='w-5 h-4 mr-2'
                                      />
                                      {country?.nameRu}
                                    </div>
                                  ),
                                }))}
                                onChange={(selectedOption) => {
                                  setValue('city', '');
                                  field.onChange(selectedOption);
                                  setSelectedCountry(selectedOption.value);
                                }}
                                styles={{
                                  control: (provided, state) => ({
                                    ...provided,
                                    padding: '8px',
                                    boxShadow: state.isFocused ? 0 : 0,
                                    border: state.isFocused
                                      ? '1px solid #999'
                                      : '',
                                    '&:hover': {
                                      border: state.isFocused
                                        ? '1px solid #999'
                                        : '',
                                    },
                                  }),
                                }}
                              />
                            )}
                          />
                          {errors?.country && (
                            <p className='text-red-500 mt-1 text-sm'>
                              {errors?.country.message || 'Error!'}
                            </p>
                          )}
                        </div>
                      </div>
                      <div>
                        <p className='font-medium mb-2'>Город</p>
                        <div className='relative'>
                          <Controller
                            name='city'
                            control={control}
                            rules={{
                              required: 'Поле обязательно к заполнению!',
                            }}
                            render={({ field }) => (
                              <Select
                                {...field}
                                options={cityOptions}
                                placeholder='Выберите город'
                                isDisabled={!countrySelect}
                                styles={{
                                  control: (provided, state) => ({
                                    ...provided,
                                    padding: '8px',
                                    boxShadow: state.isFocused ? 0 : 0,
                                    border: state.isFocused
                                      ? '1px solid #999'
                                      : '',
                                    '&:hover': {
                                      border: state.isFocused
                                        ? '1px solid #999'
                                        : '',
                                    },
                                  }),
                                }}
                              />
                            )}
                          />
                          {errors?.city && (
                            <p className='text-red-500 mt-1 text-sm'>
                              {errors?.city.message || 'Error!'}
                            </p>
                          )}
                        </div>
                      </div>
                      <div>
                        <p className='font-medium mb-2'>Адрес</p>
                        <input
                          className='w-full border border-colGray2 p-[14px] rounded-[4px] focus:border-black focus:outline-none'
                          placeholder='Введите адрес'
                          {...register('address', {
                            required: 'Поле обязательно к заполнению!',
                          })}
                        />
                        {errors?.address && (
                          <p className='text-red-500 mt-1 text-sm'>
                            {errors?.address?.message ||
                              'Поле обязательно к заполнению!'}
                          </p>
                        )}
                      </div>
                    </>
                  ) : (
                    <div>
                      <p className='font-medium mb-2'>Пункт выдачи GivBox</p>
                      <div className='relative'>
                        <Controller
                          name='depot'
                          control={control}
                          rules={{
                            required: 'Поле обязательно к заполнению!',
                          }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              placeholder='Выберите пункт выдачи'
                              options={depots?.map((el) => ({
                                value: el?.id,
                                city: el?.city?.id,
                                country: el?.country?.id,
                                address:
                                  el?.city?.nameRu + ', ' + el?.country?.nameRu,
                                label: (
                                  <div
                                    key={el?.el}
                                    className='flex items-center'
                                  >
                                    <div className='w-8 h-6 mr-2 overflow-hidden'>
                                      <img
                                        src={el?.images[0]}
                                        alt='*'
                                        className='w-full h-full object-cover'
                                      />
                                    </div>
                                    <div>
                                      <h4 className='text-sm font-medium leading-[14px]'>
                                        {el?.nameRu}
                                      </h4>
                                      <p className='text-[11px]'>
                                        {el?.city?.nameRu +
                                          ', ' +
                                          el?.country?.nameRu}
                                      </p>
                                    </div>
                                  </div>
                                ),
                              }))}
                              styles={{
                                control: (provided, state) => ({
                                  ...provided,
                                  padding: '8px',
                                  boxShadow: state.isFocused ? 0 : 0,
                                  border: state.isFocused
                                    ? '1px solid #999'
                                    : '',
                                  '&:hover': {
                                    border: state.isFocused
                                      ? '1px solid #999'
                                      : '',
                                  },
                                }),
                              }}
                            />
                          )}
                        />
                        {errors?.country && (
                          <p className='text-red-500 mt-1 text-sm'>
                            {errors?.country.message || 'Error!'}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                  <div>
                    <p className='font-medium mb-2'>
                      Доп. информация или комментарий
                    </p>
                    <input
                      className='w-full border border-colGray2 p-[14px] rounded-[4px] focus:border-black focus:outline-none'
                      placeholder='Комментарий'
                      {...register('nameAddress', {
                        required: 'Поле обязательно к заполнению!',
                      })}
                    />
                    {errors?.nameAddress && (
                      <p className='text-red-500 mt-1 text-sm'>
                        {errors?.nameAddress.message || 'Error!'}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={handleSubmit(onSubmit)}
                  type='submit'
                  className='ld:absolute ld:bottom-[28px] ld:right-[28px] my-6 ld:my-0 font-medium hover:opacity-80 p-3 rounded-lg bg-black text-white duration-150 sm:max-w-[280px] w-full'
                >
                  Cохранить
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ModalAddress;
