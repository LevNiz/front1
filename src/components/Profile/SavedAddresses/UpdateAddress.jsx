import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { useNavigate, useParams } from 'react-router-dom';
import {
  fetchAddresses,
  fetchAddressesItem,
  updateAddress,
} from '../../../api/addresses';
import { ContentLoading } from '../../../helpers/Loader/Loader';

const UpdateAddress = () => {
  const { cities } = useSelector((state) => state?.cities);
  const { countries } = useSelector((state) => state?.countries);
  const { depots } = useSelector((state) => state?.depots);
  const { userID } = useSelector((state) => state?.user);

  const [addressType, setAddressType] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    register,
  } = useForm({
    defaultValues: async () => {
      setIsLoading(true);
      const { success, data } = await fetchAddressesItem(id);
      if (success) {
        const cityDefaults = data?.city
          ? {
              value: data?.city.id,
              label: data?.city.nameRu,
            }
          : {};
        const countryDefaults = data?.country
          ? {
              value: data?.country.id,
              label: data?.country?.nameRu,
            }
          : {};
        const depotDefaults = data?.depot
          ? {
              value: data?.depot.id,
              address: data?.city?.nameRu + ', ' + data?.country?.nameRu,
              label: (
                <div className='flex items-center'>
                  <div className='w-8 h-6 mr-2 overflow-hidden'>
                    <img
                      src={data?.depot?.images[0]}
                      alt='*'
                      className='w-full h-full object-cover'
                    />
                  </div>
                  <div>
                    <h4 className='text-sm font-medium leading-[14px]'>
                      {data?.country?.nameRu}
                    </h4>
                    <p className='text-[11px]'>
                      {data?.city?.nameRu + ', ' + data?.country?.nameRu}
                    </p>
                  </div>
                </div>
              ),
            }
          : {};
        setAddressType(data?.type);
        setIsLoading(false);
        return {
          receiverName: data?.receiverName,
          phone: data?.phone,
          type: data?.type,
          country: data?.type === 'custom' ? countryDefaults : '',
          city: data?.type === 'custom' ? cityDefaults : '',
          address: data?.type === 'custom' ? data?.address : '',
          nameAddress: data?.nameAddress,
          depot: data?.type === 'depot' ? depotDefaults : '',
        };
      }
      setIsLoading(false);
    },
  });

  const countrySelect = watch('country');

  const filteredCities = cities?.filter(
    (el) => el?.country?.id === selectedCountry
  );

  const cityOptions = filteredCities?.map((el) => ({
    value: el?.id,
    label: el?.nameRu,
  }));

  useEffect(() => {
    (async () => {
      await fetchAddressesItem(id);
    })();
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    const { success } = await updateAddress(data, userID, id);
    if (success) {
      setIsLoading(false);
      navigate(-1);
      await fetchAddresses(userID, dispatch);
    }
    setIsLoading(false);
  };

  return (
    <div className='md:p-4 pt-6 w-full'>
      <h1 className='text-xl font-medium'>Редактировать</h1>
      {isLoading ? (
        <ContentLoading extraStyle='380px' />
      ) : (
        <form className='pt-5 md:px-4'>
          <div className='grid ld:grid-cols-2 gap-5 text-left'>
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
                  {errors?.phone?.message || 'Поле обязательно к заполнению!'}
                </p>
              )}
            </div>
            <div className='ld:col-span-2'>
              <p className='font-medium mb-2'>Тип адреса</p>
              <div className='ss:flex items-center'>
                <label
                  onClick={() => setAddressType('custom')}
                  className='mb-1 ss:mb-0 ss:mr-3 flex items-center'
                >
                  <Controller
                    name='type'
                    control={control}
                    rules={{
                      required: 'Поле обязательно к заполнению!',
                    }}
                    render={({ field }) => (
                      <input
                        type='radio'
                        {...field}
                        value='custom'
                        defaultChecked={field.value === 'custom'}
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
                    rules={{
                      required: 'Поле обязательно к заполнению!',
                    }}
                    render={({ field }) => (
                      <input
                        type='radio'
                        {...field}
                        value='depot'
                        defaultChecked={field.value === 'depot'}
                      />
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
                                key={country?.id}
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
                              border: state.isFocused ? '1px solid #999' : '',
                              '&:hover': {
                                border: state.isFocused ? '1px solid #999' : '',
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
                              border: state.isFocused ? '1px solid #999' : '',
                              '&:hover': {
                                border: state.isFocused ? '1px solid #999' : '',
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
                            <div key={el?.id} className='flex items-center'>
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
                            border: state.isFocused ? '1px solid #999' : '',
                            '&:hover': {
                              border: state.isFocused ? '1px solid #999' : '',
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
            className='mt-16 font-medium ml-auto flex justify-center hover:opacity-80 p-3 rounded-lg bg-black text-white duration-150 sm:max-w-[280px] w-full'
          >
            Cохранить
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateAddress;
