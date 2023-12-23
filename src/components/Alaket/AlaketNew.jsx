import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

import { ContentLoading } from '../../helpers/Loader/Loader';
import { postAlaket } from '../../api/alaket';
import imgFile from '../../assets/icons/photo.svg';
import noImg from '../../assets/images/no-image.svg';
import { fetchCities } from '../../api/cities';

const AlaketNew = () => {
  const { userID } = useSelector((state) => state?.user);
  const { cities } = useSelector((state) => state?.cities);

  const [isLoading, setIsLoading] = useState(false);
  const [selectedSenderCity, setSelectedSenderCity] = useState({});
  const [selectedReceiverCity, setSelectedReceiverCity] = useState({});
  const [negotiable, setNegotiable] = useState(false);
  const [photo, setPhoto] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
    watch,
  } = useForm({
    defaultValues: {
      type: 'alaketem',
    },
  });

  const alaketType = watch('type');

  const onSubmit = async (data) => {
    if (userID) {
      data.negotiable = negotiable;
      setIsLoading(true);
      const { success } = await postAlaket(data, photo, userID);
      if (success) {
        setIsLoading(false);
        navigate(-1);
      }
      setIsLoading(false);
    } else {
      navigate('/auth/sign-in');
    }
  };

  useEffect(() => {
    (async () => {
      await fetchCities(dispatch);
    })();
  }, [dispatch]);

  return (
    <div className='w-full content py-20'>
      <h3 className='text-center mm:text-left text-2xl pt-8 pb-6 font-medium'>
        Опубликовать
      </h3>
      {isLoading ? (
        <ContentLoading extraStyle='480px' />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className='max-w-4xl'>
          <div className='flex mb-5'>
            <label
              htmlFor='alaketem'
              className={`${
                alaketType === 'alaketem'
                  ? 'border-colYellow bg-colYellow'
                  : 'border-colYellow'
              } border w-full rounded-tl-md rounded-bl-md mm:max-w-[180px] py-2 text-center border-r-0 cursor-pointer`}
            >
              <input
                className='hidden'
                id='alaketem'
                type='radio'
                value='alaketem'
                {...register('type')}
              />
              Возьму собой
            </label>
            <label
              htmlFor='berem'
              className={`${
                alaketType === 'berem'
                  ? 'border-colYellow bg-colYellow'
                  : 'border-colYellow'
              } border mm:max-w-[180px] w-full rounded-tr-md rounded-br-md py-2 text-center cursor-pointer`}
            >
              <input
                className='hidden'
                id='berem'
                type='radio'
                value='berem'
                {...register('type')}
              />
              Передаю
            </label>
          </div>
          <div className='grid mm:grid-cols-2 gap-6'>
            <div>
              <p className='font-medium mb-2'>Откуда?</p>
              <Controller
                name='fromCity'
                control={control}
                rules={{ required: 'Поле обязательно к заполнению!' }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={cities?.map((el) => ({
                      value: el?.id,
                      label: (
                        <div key={el?.id} className='flex items-center'>
                          <img
                            src={el?.country?.icon}
                            alt='*'
                            className='w-5 mr-2'
                          />
                          {el?.nameRu}
                        </div>
                      ),
                      isDisabled:
                        selectedReceiverCity &&
                        el.id === selectedReceiverCity.value,
                    }))}
                    placeholder='Выберите город'
                    onChange={(selectedOption) => {
                      field.onChange(selectedOption);
                      setSelectedSenderCity(selectedOption);
                    }}
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

              {errors?.fromCity && (
                <p className='text-red-500 mt-1 text-sm'>
                  {errors?.fromCity.message || 'Error!'}
                </p>
              )}
            </div>
            <div>
              <p className='font-medium mb-2'>Куда?</p>
              <Controller
                name='toCity'
                control={control}
                rules={{ required: 'Поле обязательно к заполнению!' }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={cities?.map((el) => ({
                      value: el?.id,
                      label: (
                        <div key={el?.id} className='flex items-center'>
                          <img
                            src={el?.country?.icon}
                            alt='*'
                            className='w-5 mr-2'
                          />
                          {el?.nameRu}
                        </div>
                      ),
                      isDisabled:
                        selectedSenderCity &&
                        el.id === selectedSenderCity.value,
                    }))}
                    placeholder='Выберите город'
                    onChange={(selectedOption) => {
                      field.onChange(selectedOption);
                      setSelectedReceiverCity(selectedOption);
                    }}
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
              {errors?.toCity && (
                <p className='text-red-500 mt-1 text-sm'>
                  {errors?.toCity.message || 'Error!'}
                </p>
              )}
            </div>
            <div>
              <p className='font-medium mb-2'>Когда?</p>
              <input
                className='w-full border border-colGray2 p-[14px] rounded-[4px] focus:border-black focus:outline-none bg-transparent'
                placeholder='Выберите дату'
                type='date'
                {...register('date')}
              />
              {errors?.date && (
                <p className='text-red-500 mt-1 text-sm'>
                  {errors?.date?.message || 'Поле обязательно к заполнению!'}
                </p>
              )}
            </div>
            <div>
              <p className='font-medium mb-2'>Заголовок</p>
              <input
                className='w-full border border-colGray2 p-[14px] rounded-[4px] focus:border-black focus:outline-none'
                placeholder='Заголовок'
                {...register('title', {
                  required: 'Поле обязательно к заполнению!',
                })}
              />
              {errors?.title && (
                <p className='text-red-500 mt-1 text-sm'>
                  {errors?.title?.message || 'Поле обязательно к заполнению!'}
                </p>
              )}
            </div>
            <div>
              <p className='font-medium mb-2'>Описание</p>
              <input
                className='w-full border border-colGray2 p-[14px] rounded-[4px] focus:border-black focus:outline-none'
                placeholder='Описание'
                {...register('description')}
              />
            </div>
            <div>
              <p className='font-medium mb-2'>Цена</p>
              <div className='flex items-center min-h-[54px]'>
                <input
                  className={`${
                    negotiable ? 'hidden' : ''
                  } max-w-[200px] w-full border border-colGray2 p-[14px] rounded-[4px] focus:border-black focus:outline-none mr-2`}
                  placeholder='Цена'
                  type='number'
                  inputMode='numeric'
                  disabled={negotiable}
                  {...register('cost', {
                    required: negotiable ? false : true,
                  })}
                />
                <>
                  <input
                    className='hidden'
                    type='checkbox'
                    id='checkbox'
                    onChange={() => setNegotiable(!negotiable)}
                  />
                  <label
                    htmlFor='checkbox'
                    className='text-sm flex cursor-pointer items-center'
                  >
                    <div className='w-7 h-7 min-w-[28px] min-h-[28px] mr-2 flex justify-center items-center bg-yellow-300 border border-white rounded'>
                      {negotiable ? (
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
                    <p>Договорная</p>
                  </label>
                </>
              </div>
              {errors?.cost && (
                <p
                  className={`${
                    negotiable ? 'hidden' : ''
                  } text-red-500 mt-1 text-sm`}
                >
                  {errors?.cost?.message || 'Поле обязательно к заполнению!'}
                </p>
              )}
            </div>
            <div>
              <p className='font-medium mb-2'>Прикрепите фото</p>
              <label htmlFor='fileVal'>
                <input
                  className='hidden'
                  id='fileVal'
                  type='file'
                  accept='image/jpeg, image/jpg, image/png, image/webp'
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
                <div className='border-dashed border-2 border-[#999] p-5 flex justify-center items-center cursor-pointer rounded-md'>
                  <div className='py-2'>
                    <img className='mx-auto' src={imgFile} alt='*' />
                    <p className='opacity-50 pt-2'>Загрузить фото</p>
                  </div>
                </div>
              </label>
            </div>
            <div className='max-w-[280px] mm:max-w-[116px] max-h-[280px] mm:max-h-[116px] mm:mt-8 flex justify-center items-center bg-gray-200 rounded-md overflow-hidden'>
              <img
                className='w-full h-full object-contain'
                src={photo ? URL.createObjectURL(photo) : noImg}
                alt='*'
              />
            </div>
          </div>
          <button
            type='submit'
            className='mt-10 font-medium hover:opacity-80 p-4 mm:p-3 rounded-lg bg-black text-white duration-150 mm:max-w-[280px] w-full'
          >
            Опубликовать
          </button>
        </form>
      )}
    </div>
  );
};

export default AlaketNew;
