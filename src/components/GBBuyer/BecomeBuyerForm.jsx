import { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { fetchCountries } from '../../api/countries';
import selfie from '../../assets/images/selfie.jpeg';
import passportImg from '../../assets/images/passport.webp';

const BecomeBuyerForm = ({
  control,
  register,
  errors,
  setPassportSelfie,
  passportSelfie,
  setPassport,
  passport,
}) => {
  const { countries } = useSelector((state) => state?.countries);
  const dispatch = useDispatch();

  const countryOptions = countries?.map((country) => ({
    value: country?.id,
    label: (
      <div key={country?.id} className='flex items-center'>
        <img src={country?.icon} alt={country?.nameRu} className='w-5 mr-2' />
        {country?.nameRu}
      </div>
    ),
  }));

  useEffect(() => {
    async () => {
      await fetchCountries(dispatch);
    };
  }, [dispatch]);

  return (
    <>
      <h1 className='text-xl font-medium mb-5'>Форма заявки</h1>
      <div className='flex'>
        <div className='w-2/5 space-y-3'>
          <div>
            <p className='font-medium mb-2'>ФИО</p>
            <input
              className='w-full border border-colGray2 p-[14px] rounded-[4px] focus:border-black focus:outline-none'
              placeholder='ФИО'
              {...register('fullname', {
                required: 'Поле обязательно к заполнению!',
              })}
            />
            {errors?.fullname && (
              <p className='text-red-500 mt-1 text-sm'>
                {errors?.fullname?.message || 'Поле обязательно к заполнению!'}
              </p>
            )}
          </div>
          <div>
            <p className='font-medium mb-2'>Стаж работы</p>
            <input
              className='w-full border border-colGray2 p-[14px] rounded-[4px] focus:border-black focus:outline-none'
              placeholder='Стаж работы'
              {...register('experience', {
                required: 'Поле обязательно к заполнению!',
              })}
            />
            {errors?.experience && (
              <p className='text-red-500 mt-1 text-sm'>
                {errors?.experience?.message ||
                  'Поле обязательно к заполнению!'}
              </p>
            )}
          </div>
          <div>
            <p className='font-medium mb-2'>Скорость выкупа</p>
            <input
              className='w-full border border-colGray2 p-[14px] rounded-[4px] focus:border-black focus:outline-none'
              placeholder='Скорость выкупа'
              {...register('redemption_speed', {
                required: 'Поле обязательно к заполнению!',
              })}
            />
            {errors?.redemption_speed && (
              <p className='text-red-500 mt-1 text-sm'>
                {errors?.redemption_speed?.message ||
                  'Поле обязательно к заполнению!'}
              </p>
            )}
          </div>
          <div>
            <p className='font-medium mb-2'>Размер комиссии</p>
            <input
              className='w-full border border-colGray2 p-[14px] rounded-[4px] focus:border-black focus:outline-none'
              placeholder='Размер комиссии'
              {...register('commission', {
                required: 'Поле обязательно к заполнению!',
              })}
            />
            {errors?.commission && (
              <p className='text-red-500 mt-1 text-sm'>
                {errors?.commission?.message ||
                  'Поле обязательно к заполнению!'}
              </p>
            )}
          </div>
          <div>
            <p className='font-medium mb-2'>Способ оплаты</p>
            <input
              className='w-full border border-colGray2 p-[14px] rounded-[4px] focus:border-black focus:outline-none'
              placeholder='Способ оплаты'
              {...register('paymentType', {
                required: 'Поле обязательно к заполнению!',
              })}
            />
            {errors?.paymentType && (
              <p className='text-red-500 mt-1 text-sm'>
                {errors?.paymentType?.message ||
                  'Поле обязательно к заполнению!'}
              </p>
            )}
          </div>
          <div>
            <p className='font-medium mb-2'>Страна проживания</p>
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
                    options={countryOptions}
                    menuPortalTarget={document.body}
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
                      menuPortal: (provided) => ({
                        ...provided,
                        zIndex: 9999999,
                      }),
                      menu: (provided) => ({
                        ...provided,
                        position: 'absolute',
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
            <p className='font-medium mb-2'>
              Страны в которых совершаете покупки
            </p>
            <div className='relative'>
              <Controller
                name='shop_countries'
                control={control}
                rules={{
                  required: 'Поле обязательно к заполнению!',
                }}
                render={({ field }) => (
                  <Select
                    {...field}
                    placeholder='Выберите страны'
                    options={countryOptions}
                    menuPortalTarget={document.body}
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
                      menuPortal: (provided) => ({
                        ...provided,
                        zIndex: 9999999,
                      }),
                      menu: (provided) => ({
                        ...provided,
                        position: 'absolute',
                      }),
                    }}
                  />
                )}
              />
              {errors?.shop_countries && (
                <p className='text-red-500 mt-1 text-sm'>
                  {errors?.shop_countries.message || 'Error!'}
                </p>
              )}
            </div>
          </div>
          <div>
            <p className='font-medium mb-2'>E-mail</p>
            <input
              className='w-full border border-colGray2 p-[16px] mm:p-[14px] rounded-[4px] focus:border-black focus:outline-none'
              placeholder='E-mail'
              type='email'
              {...register('email', {
                required: 'Поле обязательно к заполнению!',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Введите корректный адрес электронной почты',
                },
              })}
            />
            {errors?.email && (
              <p className='text-red-500 mt-1 text-sm'>
                {errors?.email?.message || 'Поле обязательно к заполнению!'}
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
          <div>
            <p className='font-medium mb-2'>Доп. информация</p>
            <textarea
              className='w-full border resize-none border-colGray2 p-[14px] rounded-[4px] focus:border-black focus:outline-none'
              placeholder='Доп. информация'
              {...register('comment', {
                required: false,
              })}
            />
          </div>
        </div>
        <div className='w-3/5 pl-8'>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <p className='font-medium mb-2'>Копия паспорта</p>
              <div className='h-56 border border-gray-300 rounded-lg overflow-hidden'>
                <img
                  className='w-full h-full object-contain'
                  src={passport ? URL.createObjectURL(passport) : passportImg}
                  alt='*'
                />
              </div>
              <label htmlFor='pass'>
                <input
                  className='hidden'
                  id='pass'
                  type='file'
                  onChange={(e) => setPassport(e.target.files[0])}
                  accept='image/jpeg, image/jpg, image/png, image/webp'
                />
                <div className='mt-3 border border-gray-300 p-2 flex justify-center items-center cursor-pointer rounded-md'>
                  Загрузить фото
                </div>
              </label>
              {!passport && (
                <p className='text-red-500 text-sm mt-2'>Выберите фото *</p>
              )}
            </div>
            <div>
              <p className='font-medium mb-2'>Сельфи с паспортом</p>
              <div className='h-56 border border-gray-300 rounded-lg overflow-hidden'>
                <img
                  className='w-full h-full object-contain'
                  src={
                    passportSelfie
                      ? URL.createObjectURL(passportSelfie)
                      : selfie
                  }
                  alt='*'
                />
              </div>
              <label htmlFor='self'>
                <input
                  className='hidden'
                  id='self'
                  type='file'
                  onChange={(e) => setPassportSelfie(e.target.files[0])}
                  accept='image/jpeg, image/jpg, image/png, image/webp'
                />
                <div className='mt-3 border border-gray-300 p-2 flex justify-center items-center cursor-pointer rounded-md'>
                  Загрузить фото
                </div>
              </label>
              {!passportSelfie && (
                <p className='text-red-500 text-sm mt-2'>Выберите фото *</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BecomeBuyerForm;
