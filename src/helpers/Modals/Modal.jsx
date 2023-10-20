import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import PhoneInput from 'react-phone-input-2';
import { ContentLoading } from '../Loader/Loader';
import 'react-phone-input-2/lib/material.css';
import sosImg from './../../assets/images/sos.svg';
import inCorrectImg from './../../assets/images/404.svg';
import success from './../../assets/images/success.jpg';
import back from './../../assets/icons/arrow-left.svg';
import { fetchAddresses, postAddress } from '../../api/addresses';

const Modal = ({ isOpen, onClose, content, logOutUser }) => {
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

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center px-3 z-[999999]'>
      <div
        onClick={onClose}
        className='absolute inset-0 bg-gray-800 opacity-50'
      ></div>
      {content == 'deleteAllNotifications' ? (
        <div className='bg-white p-6 rounded-[30px] shadow-md z-10 max-w-[360px] w-full'>
          <div className='flex justify-center py-5'>
            <img src={sosImg} alt='*' />
          </div>
          <h3 className='text-center text-xl mm:text-2xl font-medium'>
            Вы уверены, что хотите удалить все сообщения?
          </h3>
          <div className='flex justify-center my-12 mm:my-16 space-x-5'>
            <button
              onClick={onClose}
              className='bg-black px-5 py-2 font-medium text-white rounded-[10px]'
            >
              Нет
            </button>
            <button className='bg-white px-5 py-2 font-medium text-black border border-black rounded-[10px]'>
              Да
            </button>
          </div>
        </div>
      ) : content == 'deleteNotification' ? (
        <div className='bg-white p-6 rounded-[30px] shadow-md z-10 max-w-[360px] w-full'>
          <div className='flex justify-center py-5'>
            <img src={sosImg} alt='*' />
          </div>
          <h3 className='text-center text-xl mm:text-2xl font-medium'>
            Вы уверены, что хотите удалить сообщениe?
          </h3>
          <div className='flex justify-center my-12 mm:my-16 space-x-5'>
            <button
              onClick={onClose}
              className='bg-black px-5 py-2 font-medium text-white rounded-[10px]'
            >
              Нет
            </button>
            <button className='bg-white px-5 py-2 font-medium text-black border border-black rounded-[10px]'>
              Да
            </button>
          </div>
        </div>
      ) : content == 'logout' ? (
        <div className='bg-white p-6 rounded-[30px] shadow-md z-10 max-w-[360px] w-full'>
          <div className='flex justify-center py-5'>
            <img src={sosImg} alt='*' />
          </div>
          <h3 className='text-center text-xl mm:text-2xl font-medium'>
            Вы действительно хотите выйти из аккаунта?
          </h3>
          <div className='flex justify-center my-12 mm:my-16 space-x-5'>
            <button
              onClick={onClose}
              className='bg-black px-5 py-2 font-medium text-white rounded-[10px]'
            >
              Нет
            </button>
            <button
              onClick={logOutUser}
              className='bg-white px-5 py-2 font-medium text-black border border-black rounded-[10px]'
            >
              Да
            </button>
          </div>
        </div>
      ) : content == 'notFound' ? (
        <div className='bg-white p-8 rounded-[30px] shadow-md z-10 max-w-[360px] w-full text-center'>
          <div className='py-10'>
            <img className='mx-auto' src={inCorrectImg} alt='*' />
            <h4 className='text-center font-medium mt-5 text-xl'>
              По вашему запросу ничего не нашли...
            </h4>
          </div>
        </div>
      ) : content === 'successRequest' ? (
        <div className='bg-white p-8 rounded-[30px] shadow-md z-10 max-w-[360px] w-full text-center'>
          <div className='flex justify-center py-5'>
            <img src={success} alt='*' />
          </div>
          <h3 className='text-xl font-medium mb-8'>
            Ваша заявка успешна отправлена!
          </h3>
          <div className='flex px-8 mb-8'>
            <NavLink
              className='bg-colYellow w-full py-3 font-medium rounded-lg hover:bg-colYellowHover duration-100'
              to='/'
            >
              Перейти на главную
            </NavLink>
          </div>
        </div>
      ) : content === 'AddressModal' ? (
        <div className='bg-white p-8 rounded-md h-[90vh] shadow-md z-10 max-w-[90%] w-full text-center relative overflow-hidden overflow-y-scroll'>
          {addressForm ? (
            <>
              <div className='flex justify-between items-center mb-10'>
                <h3 className='text-2xl font-medium'>Выберите адрес</h3>
                <button
                  onClick={() => setAddressForm(false)}
                  className='bg-black text-white py-3 px-6 font-medium rounded-md hover:opacity-70 duration-100'
                >
                  + Добавить адрес
                </button>
              </div>
              {loading ? (
                <ContentLoading extraStyle='380px' />
              ) : error ? (
                'Error'
              ) : addresses?.length ? (
                <div className='grid grid-cols-4 gap-4 h-full'>
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
                      <button className='bg-colYellow hover:opacity-70 duration-200 w-full p-2 rounded-md mt-5 text-sm font-medium'>
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
                className='w-6 cursor-pointer absolute top-8 left-8'
                src={back}
                alt='*'
                onClick={() => setAddressForm(true)}
              />
              <h2 className='text-xl font-medium mb-5'>Добавить новый адрес</h2>
              {loading ? (
                <ContentLoading extraStyle='380px' />
              ) : (
                <form className='pt-5 flex flex-col justify-between'>
                  <div className='grid grid-cols-3 gap-5 text-left'>
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
                      <Controller
                        name='phone'
                        className='w-full'
                        control={control}
                        defaultValue=''
                        rules={{
                          required: 'Поле обязательно к заполнению!',
                        }}
                        render={({ field }) => (
                          <PhoneInput
                            {...field}
                            placeholder='Введите номер телефона'
                            country={'kg'}
                            countryCodeEditable={false}
                            specialLabel={true}
                            onChange={(value) => {
                              field.onChange(`+${value}`);
                            }}
                            value={field.value}
                            inputProps={{
                              className:
                                'w-full border border-colGray2 p-[14px] pl-[56px] rounded-[4px] focus:border-black focus:outline-none',
                            }}
                          />
                        )}
                      />
                      {errors?.phone && (
                        <p className='text-red-500 mt-1 text-sm'>
                          {errors?.phone?.message ||
                            'Поле обязательно к заполнению!'}
                        </p>
                      )}
                    </div>
                    <div className='col-span-3'>
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
                                    el?.city?.nameRu +
                                    ', ' +
                                    el?.country?.nameRu,
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
                    className='absolute bottom-[28px] right-[28px] font-medium hover:opacity-80 p-3 rounded-lg bg-black text-white duration-150 max-w-[280px] w-full'
                  >
                    Cохранить
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      ) : (
        <div className='bg-white p-8 rounded-[30px] shadow-md z-10 max-w-[360px] w-full text-center'>
          <div className='flex justify-center py-5'>
            <img src={inCorrectImg} alt='*' />
          </div>
          <h3 className='text-lg font-semibold'>Неверный логин или пароль</h3>
          <p className='text-base mt-8 mb-4'>Забыли пароль?</p>
          <div className='flex px-8 mb-8'>
            <NavLink
              className='bg-colYellow w-full py-3 rounded-lg hover:bg-colYellowHover duration-100'
              to='/auth/reset-password'
            >
              Восстановить
            </NavLink>
          </div>
          <p className='text-sm mt-8 mb-1'>У вас нет аккаунта?</p>
          <NavLink to='/auth/sign-up' className='text-base underline'>
            Зарегистрироваться
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Modal;
