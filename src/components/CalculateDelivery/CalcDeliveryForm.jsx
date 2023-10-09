import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { fetchParcelCategories } from '../../api/parcels';
import { useSelector } from 'react-redux';

const CalcDeliveryForm = ({ onSubmit }) => {
  const [parcelData, setParcelData] = useState([]);
  const [parcelSize, setParcelSize] = useState('');

  const { cities } = useSelector((state) => state?.cities);

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    (async () => {
      const { success, data } = await fetchParcelCategories();
      if (success) {
        setParcelData(data);
      }
    })();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='grid grid-cols-3 gap-6'>
        <div>
          <p className='font-medium mb-2'>Город отправки</p>
          <Controller
            name='senderCity'
            control={control}
            rules={{ required: 'Поле обязательно к заполнению!' }}
            render={({ field }) => (
              <Select
                {...field}
                options={cities?.map((el) => ({
                  value: el?.id,
                  label: `${el?.nameRu}, ${el?.country?.nameRu}`,
                }))}
                placeholder='Выберите город'
                onChange={(selectedOption) => {
                  field.onChange(selectedOption);
                }}
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    boxShadow: state.isFocused ? 0 : 0,
                    border: state.isFocused ? '1px solid #999' : '',
                    '&:hover': {
                      border: state.isFocused ? '1px solid #999' : '',
                    },
                    padding: '8px',
                  }),
                }}
              />
            )}
          />
          {errors?.senderCity && (
            <p className='text-red-500 mt-1 text-sm'>
              {errors?.senderCity.message || 'Error!'}
            </p>
          )}
        </div>
        <div>
          <p className='font-medium mb-2'>Город назначения</p>
          <Controller
            name='receiverCity'
            control={control}
            rules={{ required: 'Поле обязательно к заполнению!' }}
            render={({ field }) => (
              <Select
                {...field}
                options={cities?.map((el) => ({
                  value: el?.id,
                  label: `${el?.nameRu}, ${el?.country?.nameRu}`,
                }))}
                placeholder='Выберите город'
                onChange={(selectedOption) => {
                  field.onChange(selectedOption);
                }}
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    boxShadow: state.isFocused ? 0 : 0,
                    border: state.isFocused ? '1px solid #999' : '',
                    '&:hover': {
                      border: state.isFocused ? '1px solid #999' : '',
                    },
                    padding: '8px',
                  }),
                }}
              />
            )}
          />
          {errors?.receiverCity && (
            <p className='text-red-500 mt-1 text-sm'>
              {errors?.receiverCity.message || 'Error!'}
            </p>
          )}
        </div>
        <div>
          <p className='font-medium mb-2'>Размер посылки</p>
          <Controller
            name='city'
            control={control}
            rules={{ required: 'Поле обязательно к заполнению!' }}
            render={({ field }) => (
              <Select
                {...field}
                options={[
                  {
                    value: 'custom',
                    label: 'Точные',
                  },
                  ...(parcelData || []).map((el) => ({
                    value: el?.id,
                    label: `${el?.nameRu} (${el?.length}x${el?.width}x${el?.height} см)`,
                  })),
                ]}
                placeholder='Выберите размер'
                isSearchable={false}
                onChange={(selectedOption) => {
                  field.onChange(selectedOption);
                  setParcelSize(selectedOption);
                }}
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    boxShadow: state.isFocused ? 0 : 0,
                    border: state.isFocused ? '1px solid #999' : '',
                    '&:hover': {
                      border: state.isFocused ? '1px solid #999' : '',
                    },
                    padding: '8px',
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
        {parcelSize?.value === 'custom' ? (
          <>
            <div>
              <p className='font-medium mb-2'>Габариты, см</p>
              <div className='flex justify-between items-center'>
                <input
                  className='w-full border border-colGray2 p-[14px] rounded-[4px] focus:border-black focus:outline-none'
                  placeholder='Длина'
                  {...register('length', {
                    required: 'Поле обязательно к заполнению!',
                  })}
                />
                <span className='mx-2'>x</span>
                <input
                  className='w-full border border-colGray2 p-[14px] rounded-[4px] focus:border-black focus:outline-none'
                  placeholder='Ширина'
                  {...register('width', {
                    required: 'Поле обязательно к заполнению!',
                  })}
                />
                <span className='mx-2'>x</span>
                <input
                  className='w-full border border-colGray2 p-[14px] rounded-[4px] focus:border-black focus:outline-none'
                  placeholder='Высота'
                  {...register('height', {
                    required: 'Поле обязательно к заполнению!',
                  })}
                />
              </div>
            </div>
            <div>
              <p className='font-medium mb-2'>Вес посылки, кг</p>
              <div className='flex justify-between items-center max-w-[140px]'>
                <input
                  className='w-full border border-colGray2 p-[14px] rounded-[4px] focus:border-black focus:outline-none'
                  placeholder='Вес'
                  type='number'
                  defaultValue='0.1'
                  {...register('weight', {
                    required: 'Поле обязательно к заполнению!',
                  })}
                />
              </div>
            </div>
          </>
        ) : (
          ''
        )}
      </div>
      <button
        type='submit'
        className='uppercase font-medium hover:opacity-80 p-4 rounded-lg bg-black text-white duration-150 max-w-[320px] w-full ml-auto flex justify-center items-center mt-5'
      >
        Рассчитать
      </button>
    </form>
  );
};

export default CalcDeliveryForm;
